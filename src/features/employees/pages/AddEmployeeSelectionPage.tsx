/**
 * AddEmployeeSelectionPage Component
 * Page to select between Quick Add or Full Registration
 */

import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Zap, FileText } from 'lucide-react'

export function AddEmployeeSelectionPage() {
  const navigate = useNavigate()

  const handleQuickAdd = () => {
    navigate('/employees/new/quick')
  }

  const handleFullRegistration = () => {
    navigate('/employees/new/full')
  }

  const handleBack = () => {
    navigate('/employees')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Add New Employee"
          description="Choose how you want to add a new employee to the system"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleBack}
          className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid mt-24 grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Quick Add Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#09B0B6]" onClick={handleQuickAdd}>
          <CardHeader className="text-center">
            <div className="mx-auto p-4 rounded-full bg-[#09B0B6]/10 w-16 h-16 flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-[#09B0B6]" />
            </div>
            <CardTitle className="text-xl text-[#05647A] dark:text-[#09B0B6]">
              Quick Add
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Fast employee registration with essential information only
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Includes:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Identity information</li>
                <li>Contact details</li>
                <li>Role & location</li>
              </ul>
            </div>
            <Button
              onClick={handleQuickAdd}
              className="w-full gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              <Zap className="h-4 w-4" />
              Quick Add Employee
            </Button>
          </CardContent>
        </Card>

        {/* Full Registration Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#09B0B6]" onClick={handleFullRegistration}>
          <CardHeader className="text-center">
            <div className="mx-auto p-4 rounded-full bg-[#09B0B6]/10 w-16 h-16 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-[#09B0B6]" />
            </div>
            <CardTitle className="text-xl text-[#05647A] dark:text-[#09B0B6]">
              Full Registration
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Complete employee registration with all details and documentation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Includes:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
  
                <li>Job details & compensation</li>
                <li>Certifications & documents</li>
                <li>Emergency contacts</li>
              </ul>
            </div>
            <Button
              onClick={handleFullRegistration}
              variant="outline"
              className="w-full gap-2 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6]"
            >
              <FileText className="h-4 w-4" />
              Full Registration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AddEmployeeSelectionPage

