"use client"

import { ArrowLeft, Package, Shield, AlertTriangle, CheckCircle, Eye, Radio, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SafetyPage() {
  const safetyFeatures = [
    {
      icon: Shield,
      title: "Advanced Collision Avoidance",
      description: "Multi-sensor systems detect and avoid obstacles in real-time using LiDAR, cameras, and radar.",
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "AI-powered visual recognition identifies people, vehicles, and hazards for safe navigation.",
    },
    {
      icon: Radio,
      title: "Redundant Communication",
      description: "Multiple communication channels ensure constant contact with ground control systems.",
    },
    {
      icon: Zap,
      title: "Emergency Protocols",
      description: "Automated emergency landing and return-to-home functions activate during system failures.",
    },
  ]

  const certifications = [
    {
      name: "FAA Part 107",
      description: "Federal Aviation Administration certification for commercial drone operations",
      status: "Certified",
    },
    {
      name: "ISO 27001",
      description: "International standard for information security management systems",
      status: "Certified",
    },
    {
      name: "ANSI/UL 3030",
      description: "Safety standard for evaluating electrical systems of unmanned aircraft",
      status: "Compliant",
    },
    {
      name: "RTCA DO-178C",
      description: "Software considerations in airborne systems and equipment certification",
      status: "Compliant",
    },
  ]

  const safetyStats = [
    { label: "Flight Hours", value: "1M+", description: "Safe autonomous flight hours completed" },
    { label: "Incident Rate", value: "0.001%", description: "Industry-leading safety record" },
    { label: "Emergency Landings", value: "99.9%", description: "Successful emergency landing rate" },
    { label: "Regulatory Compliance", value: "100%", description: "Full compliance with aviation regulations" },
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
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Shield className="h-10 w-10" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Safety First</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Our commitment to safety is unwavering. Every aspect of our drone delivery system is designed with multiple
            layers of protection to ensure the safety of people, property, and packages.
          </p>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {safetyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-green-200 font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-green-100">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Safety Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Safety Systems</h2>
            <p className="text-xl text-gray-600">Multiple layers of protection ensure safe operations</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Compliance</h2>
            <p className="text-xl text-gray-600">Meeting and exceeding industry safety standards</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {cert.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Safety Protocols */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Safety Protocols</h2>
            <p className="text-xl text-gray-600">Comprehensive procedures for every aspect of operations</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span>Pre-Flight Safety Checks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="weather">
                    <AccordionTrigger>Weather Assessment</AccordionTrigger>
                    <AccordionContent>
                      Real-time weather monitoring including wind speed, precipitation, visibility, and temperature.
                      Flights are automatically suspended when conditions exceed safe parameters.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="airspace">
                    <AccordionTrigger>Airspace Clearance</AccordionTrigger>
                    <AccordionContent>
                      Integration with air traffic control systems and real-time airspace monitoring to ensure safe
                      separation from manned aircraft and restricted areas.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="systems">
                    <AccordionTrigger>System Diagnostics</AccordionTrigger>
                    <AccordionContent>
                      Comprehensive pre-flight diagnostics including battery health, sensor calibration, communication
                      systems, and mechanical components inspection.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>In-Flight Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="tracking">
                    <AccordionTrigger>Real-Time Tracking</AccordionTrigger>
                    <AccordionContent>
                      Continuous GPS tracking with backup positioning systems. Ground control monitors every flight with
                      ability to intervene or redirect if necessary.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="obstacles">
                    <AccordionTrigger>Obstacle Detection</AccordionTrigger>
                    <AccordionContent>
                      Advanced sensor fusion combining LiDAR, cameras, and radar to detect and avoid static and dynamic
                      obstacles including birds, other aircraft, and structures.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="emergency">
                    <AccordionTrigger>Emergency Procedures</AccordionTrigger>
                    <AccordionContent>
                      Automated emergency protocols including return-to-home, emergency landing site selection, and
                      communication with emergency services if required.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Public Safety */}
        <section className="mb-20">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Public Safety Commitment</CardTitle>
              <CardDescription className="text-center text-lg">
                Our responsibility to the communities we serve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Privacy Protection</h3>
                  <p className="text-sm text-gray-600">
                    Cameras are only used for navigation and safety, with automatic privacy filtering and no recording
                    capabilities.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Noise Reduction</h3>
                  <p className="text-sm text-gray-600">
                    Specially designed propellers and flight paths minimize noise impact on residential areas and
                    wildlife.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Emergency Response</h3>
                  <p className="text-sm text-gray-600">
                    24/7 emergency response team ready to assist with any incidents or safety concerns from the public.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Safety Team */}
        <section>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Safety Concerns or Questions?</CardTitle>
              <CardDescription>
                Our safety team is available 24/7 to address any concerns or questions about our operations
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold mb-2">Emergency Hotline</h4>
                  <p className="text-lg font-mono text-blue-600">1-800-SKY-SAFE</p>
                  <p className="text-sm text-gray-600">24/7 Emergency Response</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Safety Team</h4>
                  <p className="text-lg text-blue-600">safety@skydeliver.com</p>
                  <p className="text-sm text-gray-600">Non-emergency safety concerns</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Incident Reporting</h4>
                  <p className="text-lg text-blue-600">report@skydeliver.com</p>
                  <p className="text-sm text-gray-600">Report safety incidents</p>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Button size="lg">Report Safety Concern</Button>
                <Button size="lg" variant="outline">
                  Download Safety Manual
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
