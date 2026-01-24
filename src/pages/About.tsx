import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">About This Project</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Tech Stack</CardTitle>
          <CardDescription>Modern tools for modern development</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Frontend Framework</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>React 19 - Latest version with cutting-edge features</li>
              <li>TypeScript - Type-safe development</li>
              <li>Vite - Lightning-fast build tool</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">UI & Styling</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Shadcn UI - Accessible component library</li>
              <li>Tailwind CSS - Utility-first CSS framework</li>
              <li>Radix UI - Unstyled, accessible components</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">State & Data</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>React Query (TanStack Query) - Server state management</li>
              <li>React Hook Form - Performant form handling</li>
              <li>Zod - Schema validation</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default About

