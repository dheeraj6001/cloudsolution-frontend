import React, { useEffect, useState } from "react";
import { qsList } from "@/services/admin/questions";
import Pagination from "@/components/Pagination";
import { MathJax, MathJaxContext } from "better-react-mathjax";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pencil, Trash } from "lucide-react";

type Course = {
  id: number;
  question: string;
  topic: string;
  subject: string;
  type: string;
  hint?: string;
};

const enhanceImages = (html: string) => {
  // Adds loading="lazy" to all img tags
 return html.replace(
  /<img(?![^>]*loading=['"]lazy['"])([^>]*?)\/?>/g,
  (_, attrs) => {
    return `<img loading="lazy" ${attrs} />`;
  }
);
};

const QuestionList: React.FC = () => {
  const [list, setList] = useState<Course[]>([]);
 const [, setLoading] = useState(true);

 const [, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await qsList({ pageSize, currentPage });
        if (res.status) {
          setList(res.data.results);
          setTotalPages(Math.ceil(res.data.total / pageSize));
          if (res.data.total < (currentPage - 1) * pageSize) {
            setCurrentPage(1);
          }
        } else {
          throw new Error("No Data Found");
        }
      } catch (err) {
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  const questionTypes = [
    { label: "MCQ Single Ans (MCQ)", value: "mcq" },
    { label: "MCQ Multiple Ans (MAQ)", value: "maq" },
    { label: "VMAQ", value: "vmaq" },
    { label: "Subjective Type (SUBJECTIVE)", value: "subjective" },
    { label: "Numerical Answer Type (NAT)", value: "nat" },
  ];

  return (
    <MathJaxContext
      version={3}
      config={{
        loader: { load: ["input/tex", "output/chtml"] },
        tex: {
          inlineMath: [["\\(", "\\)"]],
          displayMath: [["\\[", "\\]"]],
        },
      }}
    >
      
      <div className="p-10 space-y-6 bg-gray-50 min-h-screen text-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Question List</h2>
          <Button className="text-sm px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white">
            + Add New
          </Button>
        </div>

        <Card className="shadow-md border border-gray-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
              {["Show", "Select Test", "All Subjects", "All Topics"].map((label, idx) => (
                <Select key={idx}>
                  <SelectTrigger className="w-full bg-white border-gray-300">
                    <SelectValue placeholder={label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
              ))}

              <Select>
                <SelectTrigger className="w-full bg-white border-gray-300">
                  <SelectValue placeholder="Question Type" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full bg-white border-gray-300">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              placeholder="Search question here..."
              className="w-full mb-6 border-gray-300 bg-white"
            />

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-12 text-center font-semibold">#</TableHead>
                    <TableHead className="font-semibold">Question Details</TableHead>
                    <TableHead className="font-semibold">Topic/Subject/Type</TableHead>
                    <TableHead className="text-center font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((item, idx) => (
                    <TableRow key={item.id || idx} className="hover:bg-gray-50">
                      <TableCell className="text-center font-semibold">
                        {(currentPage - 1) * pageSize + idx + 1}
                      </TableCell>
                      <TableCell>
                        <MathJax hideUntilTypeset="first">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: enhanceImages(item.question),
                            }}
                          />
                        </MathJax>
                        <div className="text-gray-500 mt-2 text-xs space-y-1">
                          <div><strong>ANS:</strong> a</div>
                          <div><strong>Marks:</strong> +4, -1</div>
                          <div><strong>Solution:</strong> ...</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p>{item.topic}</p>
                        <p>{item.subject}</p>
                        <p>{item.type}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="outline" className="hover:bg-blue-100 border-gray-300">
                            <Pencil className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button variant="outline" className="hover:bg-red-100 border-gray-300">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1); // reset to first page on size change
          }}
        />
      </div>
    </MathJaxContext>
  );
};

export default QuestionList;
