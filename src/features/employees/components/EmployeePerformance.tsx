/**
 * EmployeePerformance Component
 * Performance tab content for Employee Detail Page
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  TrendingUp,
  Target,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Star,
  Calendar,
  User,
  MessageSquare,
} from 'lucide-react'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts'
import { Employee } from '../types'
import { cn } from '@/lib/utils'

interface EmployeePerformanceProps {
  employee: Employee
}

interface PerformanceData {
  overallRating: {
    qualityOfWork: number
    punctuality: number
    communication: number
    teamwork: number
  }
  goals: Array<{
    id: string
    title: string
    progress: number
    target: number
    status: 'completed' | 'in-progress' | 'not-started'
  }>
  tripsThisMonth: {
    successful: number
    cancelled: number
    issuesReported: number
    successRate: number
  }
  recentReviews: Array<{
    id: string
    reviewer: string
    date: string
    rating: number
    comment: string
    category: string
  }>
}

// Mock performance data - in real app, this would come from API
const getPerformanceData = (employee: Employee): PerformanceData => {
  return {
    overallRating: {
      qualityOfWork: 4.5,
      punctuality: 4.8,
      communication: 4.3,
      teamwork: 4.6,
    },
    goals: [
      {
        id: 'goal-1',
        title: 'Complete ACLS Recertification',
        progress: 100,
        target: 100,
        status: 'completed',
      },
      {
        id: 'goal-2',
        title: 'Mentor 2 New Hires',
        progress: 100,
        target: 2,
        status: 'completed',
      },
      {
        id: 'goal-3',
        title: 'Reduce Response Time by 10%',
        progress: 75,
        target: 100,
        status: 'in-progress',
      },
    ],
    tripsThisMonth: {
      successful: 45,
      cancelled: 3,
      issuesReported: 2,
      successRate: 90,
    },
    recentReviews: [
      {
        id: 'review-1',
        reviewer: 'Dr. Ahmed Mohamed',
        date: '2024-01-15',
        rating: 5,
        comment: 'Excellent performance during emergency response. Quick thinking and professional demeanor.',
        category: 'Quality of Work',
      },
      {
        id: 'review-2',
        reviewer: 'Sarah Johnson',
        date: '2024-01-10',
        rating: 4,
        comment: 'Great teamwork and communication skills. Always punctual and reliable.',
        category: 'Teamwork',
      },
      {
        id: 'review-3',
        reviewer: 'Michael Chen',
        date: '2024-01-05',
        rating: 5,
        comment: 'Outstanding patient care and attention to detail. Highly recommended.',
        category: 'Patient Care',
      },
    ],
  }
}

export function EmployeePerformance({ employee }: EmployeePerformanceProps) {
  const data = getPerformanceData(employee)

  // Prepare data for radar chart
  const radarData = [
    { category: 'Quality of Work', value: data.overallRating.qualityOfWork, fullMark: 5 },
    { category: 'Punctuality', value: data.overallRating.punctuality, fullMark: 5 },
    { category: 'Communication', value: data.overallRating.communication, fullMark: 5 },
    { category: 'Teamwork', value: data.overallRating.teamwork, fullMark: 5 },
  ]

  // Prepare data for trips chart
  const tripsChartData = [
    { name: 'Successful', value: data.tripsThisMonth.successful, color: '#10b981' },
    { name: 'Cancelled', value: data.tripsThisMonth.cancelled, color: '#ef4444' },
    { name: 'Issues Reported', value: data.tripsThisMonth.issuesReported, color: '#f59e0b' },
  ]

  const getGoalStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle2,
          className: 'bg-green-500 hover:bg-green-600 text-white',
          label: 'Completed',
        }
      case 'in-progress':
        return {
          icon: Target,
          className: 'bg-blue-500 hover:bg-blue-600 text-white',
          label: 'In Progress',
        }
      case 'not-started':
        return {
          icon: XCircle,
          className: 'bg-gray-500 hover:bg-gray-600 text-white',
          label: 'Not Started',
        }
      default:
        return {
          icon: Target,
          className: 'bg-gray-500 hover:bg-gray-600 text-white',
          label: status,
        }
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              'w-4 h-4',
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            )}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Rating Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#09B0B6]" />
            Overall Rating
          </CardTitle>
          <CardDescription>Performance ratings across key areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10 }} />
                <Radar
                  name="Rating"
                  dataKey="value"
                  stroke="#09B0B6"
                  fill="#09B0B6"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Quality of Work</p>
              <p className="text-2xl font-bold text-[#05647A]">{data.overallRating.qualityOfWork}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Punctuality</p>
              <p className="text-2xl font-bold text-[#05647A]">{data.overallRating.punctuality}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Communication</p>
              <p className="text-2xl font-bold text-[#05647A]">{data.overallRating.communication}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Teamwork</p>
              <p className="text-2xl font-bold text-[#05647A]">{data.overallRating.teamwork}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Completed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-[#09B0B6]" />
            Goals Completed - Q4 2026 Progress
          </CardTitle>
          <CardDescription>Performance goals and completion status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.goals.map((goal) => {
            const statusConfig = getGoalStatusConfig(goal.status)
            const StatusIcon = statusConfig.icon

            return (
              <div key={goal.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{goal.title}</h4>
                      <Badge className={cn('gap-1', statusConfig.className)}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        Progress: {goal.progress}% / {goal.target}%
                      </span>
                    </div>
                  </div>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Trips This Month */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#09B0B6]" />
            Trips This Month
          </CardTitle>
          <CardDescription>Monthly trip performance and success metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tripsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {tripsChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-foreground">Successful Trips</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{data.tripsThisMonth.successful}</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-foreground">Cancelled</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">{data.tripsThisMonth.cancelled}</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-foreground">Issues Reported</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">{data.tripsThisMonth.issuesReported}</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#09B0B6]/10 border border-[#09B0B6]/20">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Success Rate</span>
                  <span className="text-2xl font-bold text-[#05647A]">{data.tripsThisMonth.successRate}%</span>
                </div>
                <Progress value={data.tripsThisMonth.successRate} className="h-2 mt-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#09B0B6]" />
            Recent Reviews
          </CardTitle>
          <CardDescription>Latest performance reviews and feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentReviews.map((review) => (
              <div
                key={review.id}
                className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-full bg-[#09B0B6]/10">
                        <User className="w-4 h-4 text-[#09B0B6]" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{review.reviewer}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                          <span className="mx-1">•</span>
                          <Badge variant="outline" className="text-xs border-[#09B0B6] text-[#05647A]">
                            {review.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-2">{review.comment}</p>
                  </div>
                  <div className="shrink-0">{renderStars(review.rating)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

