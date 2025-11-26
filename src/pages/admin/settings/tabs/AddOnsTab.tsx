
// ./tabs/IDCardTab.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, User } from "lucide-react";

export default function AddOnsTab() {
  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-lg border border-gray-200">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <User className="w-12 h-12 text-orange-500" />
            <div>
              <h2 className="text-xl font-bold">Jane Doe</h2>
              <p className="text-sm text-gray-500">User ID: #002345</p>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <p><span className="font-medium text-gray-600">Email:</span> jane.doe@example.com</p>
            <p><span className="font-medium text-gray-600">License:</span> Single Site</p>
            <p><span className="font-medium text-gray-600">Status:</span> <BadgeCheck className="inline w-4 h-4 text-green-500" /> Active</p>
            <p><span className="font-medium text-gray-600">Expires:</span> Dec 27, 2025</p>
          </div>

          <Button className="w-full">Upgrade License</Button>
        </CardContent>
      </Card>
    </div>
  );
}
