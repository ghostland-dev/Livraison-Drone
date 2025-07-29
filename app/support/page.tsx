"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Package, MessageCircle, Phone, Mail, HelpCircle, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function SupportPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
    orderId: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Support ticket submitted successfully! We'll get back to you within 24 hours.")
    setContactForm({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
      orderId: "",
    })
  }

  const faqs = [
    {
      question: "How fast is drone delivery?",
      answer:
        "Our drones typically deliver packages within 15-30 minutes depending on distance and weather conditions. Express delivery can be as fast as 10 minutes for priority orders.",
    },
    {
      question: "What can I send via drone?",
      answer:
        "We can deliver packages up to 5kg including documents, food, medicine, small electronics, and other lightweight items. Prohibited items include hazardous materials, liquids over 100ml, and fragile items.",
    },
    {
      question: "What happens if weather is bad?",
      answer:
        "For safety reasons, we suspend drone operations during severe weather conditions like heavy rain, snow, or high winds. You'll be notified immediately and can reschedule your delivery.",
    },
    {
      question: "How do I track my delivery?",
      answer:
        "You'll receive a tracking link via SMS and email once your order is confirmed. You can also track your order on our website using your order ID.",
    },
    {
      question: "What if my package is damaged?",
      answer:
        "All packages are insured up to $500. If your package arrives damaged, contact our support team within 24 hours with photos and we'll process a full refund or replacement.",
    },
    {
      question: "Can I schedule a delivery for later?",
      answer:
        "Yes! You can schedule deliveries up to 7 days in advance. Simply select your preferred date and time slot during checkout.",
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
          <p className="text-xl text-gray-600">We're here to help you with any questions or issues</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-600">1-800-SKY-DELIVER</p>
                    <p className="text-xs text-gray-500">24/7 Available</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-gray-600">Chat with an agent</p>
                    <Badge variant="secondary" className="text-xs">
                      Online
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">support@skydeliver.com</p>
                    <p className="text-xs text-gray-500">Response within 2 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 p-3 border-2 border-red-200 rounded-lg bg-red-50">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">Urgent Issues</p>
                    <p className="text-sm text-red-700">1-800-EMERGENCY</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Request</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setContactForm((prev) => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delivery">Delivery Issue</SelectItem>
                          <SelectItem value="payment">Payment Problem</SelectItem>
                          <SelectItem value="account">Account Support</SelectItem>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderId">Order ID (Optional)</Label>
                      <Input
                        id="orderId"
                        placeholder="e.g., ORD-ABC123"
                        value={contactForm.orderId}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, orderId: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide detailed information about your issue..."
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Submit Support Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription>Find quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
                    <Link href="/terms">
                      <div>
                        <p className="font-medium">Terms of Service</p>
                        <p className="text-sm text-gray-600">Read our terms and conditions</p>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
                    <Link href="/privacy">
                      <div>
                        <p className="font-medium">Privacy Policy</p>
                        <p className="text-sm text-gray-600">How we protect your data</p>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
                    <Link href="/safety">
                      <div>
                        <p className="font-medium">Safety Guidelines</p>
                        <p className="text-sm text-gray-600">Drone safety information</p>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
                    <Link href="/api-docs">
                      <div>
                        <p className="font-medium">API Documentation</p>
                        <p className="text-sm text-gray-600">For developers</p>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
