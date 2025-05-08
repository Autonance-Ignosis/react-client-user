import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";

interface LoanApplication {
  id: number;
  userId: number;
  bankAccountId: number;
  loanOfferId: number;
  appliedBankId: number;
  appliedAt: string;
  approvedAt: string | null;
  amount: number;
  tenureInMonths: number;
  interestRate: number;
  emi: number;
  nextEmiDate: string;
  status: string;
  creditCriteriaMet: boolean;
  purpose: string;
  logIncome: number;
  debtIncomeRatio: number;
  ficoScore: number;
  daysWithCreditLine: number;
  revolvingBalance: number;
  revolvingUtilization: number;
  inquiryLast6Months: number;
  timesLateIn2Years: number;
  derogatoryPublicRecords: number;
  defaultRiskProbability: number;
  mandateStatus: string | null;
}

interface IMandateApplication {
  id: number;
  loanId: number;
  userId: number;
  bankAccountId: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
  mandateVariant: string;
  category: string;
  debitType: string;
  seqType: string;
  freqType: string;
  schemaName: string;
  consRefNo: string;
  amount: number;
  startDate: string;     
  uptoDate: string;      
  upTo40Years: boolean;
  createdAt: number;     
  updatedAt: number;
  predictionStatus: "APPROVED" | "REJECTED" | "PENDING" | string;
  predictionProbability: number;
}

const LoanApplicationsPage = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state: any) => state.user) || {};
  const userId = user?.id;
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [mandateApplications, setMandateApplications] = useState<IMandateApplication[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Fetch loans on userId change
useEffect(() => {
  const fetchLoanApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/loans/user/${userId}`);
      const data = await response.json();
      const apps = Array.isArray(data) ? data : [data];

      // Set without mandateStatus for now
      setApplications(apps);
    } catch (error) {
      toast.error("Failed to load loan applications.");
    } finally {
      setLoading(false);
    }
  };

  if (userId) fetchLoanApplications();
}, [userId]);

// 2. Fetch mandates separately
useEffect(() => {
  const fetchMandateApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/mandates/user/${userId}`);
      const data = await response.json();
      const mandates = Array.isArray(data) ? data : [data];

      setMandateApplications(mandates);
    } catch (error) {
      toast.error("Failed to load mandates.");
    } finally {
      setLoading(false);
    }
  };

  if (userId) fetchMandateApplications();
}, [userId]);

// 3. Run the matching once both data sets are available
useEffect(() => {
  if (applications.length > 0 && mandateApplications.length > 0) {
    const updatedApps = applications.map((loan) => {
      const matchingMandate = mandateApplications.find(
        (mandate) => mandate.loanId === loan.id && mandate.userId == loan.userId
      );

      return {
        ...loan,
        mandateStatus: matchingMandate ? matchingMandate.status : "Not Available",
      };
    });

    setApplications(updatedApps);
  }
}, [applications.length, mandateApplications.length]);

  

  console.log(applications);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";

    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge variant="default" className="bg-green-500">
            Approved
          </Badge>
        );
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      case "PENDING":
        return (
          <Badge variant="secondary" className="bg-amber-500 text-white">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMandateStatusBadge = (mandateStatus: string | null) => {
    if (!mandateStatus) return null;

    switch (mandateStatus) {
      case "ACTIVE":
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="secondary" className="bg-amber-500 text-white">
            Pending
          </Badge>
        );
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      case "EXPIRED":
        return <Badge variant="outline" className="bg-gray-500 text-white">Expired</Badge>;
      default:
        return <Badge variant="outline">{mandateStatus}</Badge>;
    }
  };

  const applyMandate = (id: number) => {
    navigate(`/mandate/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-64 bg-muted rounded"></div>
          <div className="h-4 w-48 bg-muted rounded"></div>
          <div className="h-32 w-full max-w-3xl bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Loan Applications</h1>
        <p className="text-muted-foreground">
          View and track all your loan applications
        </p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">
              No Loan Applications Found
            </h2>
            <p className="text-muted-foreground mt-2">
              You haven't applied for any loans yet.
            </p>
            <Button onClick={() => navigate("/loans")} className="mt-4">
              Browse Loan Offers
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Cards for mobile view */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {applications.map((application) => (
              <Card key={application.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Loan #{application.id}</CardTitle>
                      <CardDescription>
                        Applied on {formatDate(application.appliedAt)}
                      </CardDescription>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-medium">
                        {formatCurrency(application.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenure</span>
                      <span className="font-medium">
                        {application.tenureInMonths} months
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly EMI</span>
                      <span className="font-medium">
                        {formatCurrency(application.emi)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Interest Rate
                      </span>
                      <span className="font-medium">
                        {application.interestRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Next EMI Date
                      </span>
                      <span className="font-medium">
                        {formatDate(application.nextEmiDate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Mandate Status</span>
                      <span className="font-medium">
                        {application.mandateStatus || "Not Available"}
                      </span>
                    </div>

                  </div>
                </CardContent>
                <CardFooter className="bg-muted/10 pt-3">
                  {application.status === "APPROVED" && !application.mandateStatus && (
                    <Button
                      onClick={() => applyMandate(application.id)}
                      className="w-full"
                    >
                      Apply Mandate
                    </Button>
                  )}
                  {(application.status !== "APPROVED" || application.mandateStatus) && (
                    <Button
                      variant="outline"
                      onClick={() => applyMandate(application.id)}
                      className="w-full"
                    >
                      View Details
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Table for desktop view */}
          <div className="hidden md:block">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applied On</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>EMI</TableHead>
                    <TableHead>Interest Rate</TableHead>
                    <TableHead>Loan Status</TableHead>
                    <TableHead>Mandate Status</TableHead>
                    <TableHead>Approval Probability</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={`table-${application.id}`}>
                      <TableCell>{formatDate(application.appliedAt)}</TableCell>
                      <TableCell>
                        {formatCurrency(application.amount)}
                      </TableCell>
                      <TableCell>{application.tenureInMonths} months</TableCell>
                      <TableCell>{formatCurrency(application.emi)}</TableCell>
                      <TableCell>{application.interestRate}%</TableCell>
                      <TableCell>
                        {getStatusBadge(application.status)}
                      </TableCell>
                      <TableCell>
                        {getMandateStatusBadge(application.mandateStatus)}
                      </TableCell>
                      <TableCell>
                        {(application.defaultRiskProbability * 100).toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right">
                          {application.status === "APPROVED" && application.mandateStatus === "Not Available" ? (
                            <Button onClick={() => applyMandate(application.id)} size="sm">
                              Apply Mandate
                            </Button>
                          ) : application.status === "REJECTED" || application.mandateStatus === "REJECTED" ? (
                            <p className="text-red-600 font-medium text-sm">Not eligible</p>
                          ) : application.status === "PENDING" || application.mandateStatus === "PENDING" ? (
                            null
                          ) : application.mandateStatus === "Not Available" ? (
                            <Button variant="outline" size="sm" onClick={() => applyMandate(application.id)}>
                              View Details
                            </Button>
                          ) : null}
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Additional information section */}
          <Card className="bg-muted/20 border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  Approved loans will be disbursed within 2-3 business days.
                </li>
                <li>
                  Your EMI will be auto-debited from your registered bank
                  account.
                </li>
                <li>
                  For any queries regarding your loan application, please
                  contact our support.
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default LoanApplicationsPage;