import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PackageDetails } from '@/services/student/package';

const tabs = [
  { id: 'tab1', label: 'Course Details' },
  { id: 'tab2', label: 'Free Resources' },
  { id: 'tab3', label: 'Test Series' },
  { id: 'tab5', label: 'Study Materials' },
  { id: 'tab6', label: 'Pricing' },
];

export default function PackageDetail() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [packageData, setPackageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { packageId } = useParams();

  useEffect(() => {
    if (!packageId) return;
    const fetchData = async () => {
      try {
        const res = await PackageDetails({ packageId });
        if (res.status) {
          setPackageData(res.data); // Ensure your API returns .data
        } else {
          throw new Error('No Data Found');
        }
      } catch (err) {
        setError('Failed to load package details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [packageId]);

  const renderTestSeries = () => {
    if (!packageData?.test_series_detail?.length) {
      return <div>No Test Series Available</div>;
    }

    return (
      <div className="space-y-6">
        {packageData.test_series_detail.map((series: any) => (
          <div key={series._id} className="border rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">{series.name}</h2>
            <ul className="space-y-2">
              {series.tests.map((test: any) => (
                <li key={test.test_id} className="border p-3 rounded bg-gray-50">
                  <h3 className="font-medium text-gray-800">{test.details?.test_name}</h3>
                  <p className="text-sm text-gray-600">{test.details?.description}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    Questions: {test.details?.total_qs} | Max Score: {test.details?.max_score} | Time Limit: {test.details?.time_limit} mins
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="w-full bg-white rounded-lg shadow">
      {/* Tab Headers */}
      <div className="flex border-b p-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 focus:outline-none ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'tab3' ? (
          renderTestSeries()
        ) : (
          <div className="text-gray-700">This is content for {tabs.find((t) => t.id === activeTab)?.label}.</div>
        )}
      </div>
    </div>
  );
}
