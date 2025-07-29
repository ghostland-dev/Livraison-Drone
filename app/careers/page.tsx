"use client"

import { ArrowLeft, Package, MapPin, Clock, Users, Briefcase, GraduationCap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CareersPage() {
  const jobs = [
    {
      id: 1,
      title: "Senior Drone Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      level: "Senior",
      description: "Lead the development of next-generation autonomous drone systems with advanced AI capabilities.",
      requirements: ["5+ years in robotics/aerospace", "Python, C++, ROS experience", "Computer vision expertise"],
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Flight Operations Specialist",
      department: "Operations",
      location: "New York, NY",
      type: "Full-time",
      level: "Mid-level",
      description: "Manage daily flight operations and ensure compliance with FAA regulations.",
      requirements: ["Drone pilot certification", "Operations experience", "Strong communication skills"],
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Austin, TX",
      type: "Full-time",
      level: "Senior",
      description: "Develop machine learning models for route optimization and predictive maintenance.",
      requirements: ["ML/AI expertise", "TensorFlow/PyTorch", "Cloud platforms experience"],
      posted: "3 days ago",
    },
    {
      id: 4,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      level: "Mid-level",
      description: "Build relationships with enterprise clients and ensure successful drone delivery implementations.",
      requirements: ["Customer success experience", "B2B sales background", "Excellent communication"],
      posted: "5 days ago",
    },
    {
      id: 5,
      title: "Safety & Compliance Officer",
      department: "Safety",
      location: "Seattle, WA",
      type: "Full-time",
      level: "Senior",
      description: "Ensure all operations meet safety standards and regulatory compliance requirements.",
      requirements: ["Aviation safety background", "Regulatory knowledge", "Risk assessment skills"],
      posted: "1 week ago",
    },
    {
      id: 6,
      title: "Product Designer",
      department: "Design",
      location: "Los Angeles, CA",
      type: "Full-time",
      level: "Mid-level",
      description: "Design intuitive user experiences for our drone delivery platform and mobile applications.",
      requirements: ["UX/UI design experience", "Figma/Sketch proficiency", "Mobile design expertise"],
      posted: "4 days ago",
    },
  ]

  const benefits = [
    "Competitive salary and equity package",
    "Comprehensive health, dental, and vision insurance",
    "Unlimited PTO and flexible work arrangements",
    "Professional development budget ($2,000/year)",
    "State-of-the-art equipment and workspace",
    "Catered meals and snacks",
    "Gym membership reimbursement",
    "Parental leave and family support",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SkyDeliver</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Join Our Mission</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Help us revolutionize urban delivery and build the future of autonomous logistics. We're looking for
            passionate innovators to join our growing team.
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold">200+</div>
              <div className="text-blue-200">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-blue-200">Open Positions</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5</div>
              <div className="text-blue-200">Office Locations</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Input placeholder="Search jobs..." />
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="customer-success">Customer Success</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                    <SelectItem value="new-york">New York, NY</SelectItem>
                    <SelectItem value="austin">Austin, TX</SelectItem>
                    <SelectItem value="seattle">Seattle, WA</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="lead">Lead/Principal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Open Positions</h2>

            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center space-x-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{job.department}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.posted}</span>
                        </span>
                      </div>
                      <div className="flex space-x-2 mb-3">
                        <Badge variant="secondary">{job.type}</Badge>
                        <Badge variant="outline">{job.level}</Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">{job.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex space-x-3">
                    <Button className="flex-1">Apply Now</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Why Join SkyDeliver?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Culture */}
            <Card>
              <CardHeader>
                <CardTitle>Our Culture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Innovation First</h4>
                  <p className="text-sm text-gray-600">
                    We encourage bold ideas and provide the resources to bring them to life.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Work-Life Balance</h4>
                  <p className="text-sm text-gray-600">
                    Flexible schedules and remote work options to support your lifestyle.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Continuous Learning</h4>
                  <p className="text-sm text-gray-600">
                    Professional development opportunities and conference attendance.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Application Process</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span>Submit application</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span>Phone screening</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span>Technical interview</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span>Final interview</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <span>Welcome to the team!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
