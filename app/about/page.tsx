"use client"

import { ArrowLeft, Package, Users, Award, Globe, Leaf, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  const stats = [
    { label: "Deliveries Completed", value: "500K+", icon: Package },
    { label: "Cities Served", value: "50+", icon: Globe },
    { label: "Team Members", value: "200+", icon: Users },
    { label: "Customer Rating", value: "4.9/5", icon: Award },
  ]

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former aerospace engineer with 15 years of experience in drone technology and logistics.",
      image: "/professional-woman-ceo.png",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      bio: "AI and robotics expert who previously led autonomous systems at major tech companies.",
      image: "/professional-man-cto.png",
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Safety",
      bio: "Aviation safety specialist ensuring all operations meet the highest safety standards.",
      image: "/professional-woman-doctor.png",
    },
    {
      name: "James Park",
      role: "VP of Operations",
      bio: "Logistics veteran who scaled delivery operations at multiple Fortune 500 companies.",
      image: "/professional-man-operations.png",
    },
  ]

  const values = [
    {
      icon: Zap,
      title: "Speed",
      description: "Delivering packages faster than ever before with cutting-edge drone technology.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Zero-emission deliveries helping reduce urban pollution and carbon footprint.",
    },
    {
      icon: Shield,
      title: "Safety",
      description: "Rigorous safety protocols and advanced AI ensure secure deliveries every time.",
    },
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
          <h1 className="text-5xl font-bold mb-6">Revolutionizing Delivery</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            We're pioneering the future of urban logistics with autonomous drone delivery, making fast, sustainable, and
            reliable delivery accessible to everyone.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="secondary">
              Join Our Mission
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Watch Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At SkyDeliver, we believe the future of urban delivery should be fast, sustainable, and accessible. Our
                mission is to transform how packages move through cities using autonomous drone technology that reduces
                traffic congestion, eliminates emissions, and delivers unprecedented speed.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Founded in 2020 by aerospace engineers and logistics experts, we've grown from a small startup to a
                leading force in autonomous delivery, serving millions of customers across major metropolitan areas.
              </p>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="px-3 py-1">
                  Founded 2020
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  Series B Funded
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  FAA Certified
                </Badge>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 flex items-center justify-center">
              <img
                src="/modern-drone-warehouse.png"
                alt="SkyDeliver Operations Center"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The innovators behind SkyDeliver</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 flex items-center justify-center">
              <img src="/advanced-ai-drone.png" alt="Drone Technology" className="rounded-lg" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Cutting-Edge Technology</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our proprietary AI-powered flight systems enable autonomous navigation through complex urban
                environments. Each drone is equipped with advanced sensors, real-time weather monitoring, and fail-safe
                mechanisms to ensure safe and reliable deliveries.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Advanced obstacle avoidance systems</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Real-time weather adaptation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Encrypted communication protocols</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Predictive maintenance algorithms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience the Future?</h2>
          <p className="text-xl mb-8">
            Join thousands of customers who have already made the switch to drone delivery.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/">Start Delivering</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/careers">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
