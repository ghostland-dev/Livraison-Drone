"use client"

import { ArrowLeft, Package, Shield, Eye, Lock, Database } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: January 15, 2024</p>
        </div>

        {/* Privacy Highlights */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">End-to-end encryption for all personal data</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">No Surveillance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Cameras used only for navigation, no recording</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Lock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Secure Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Data stored in encrypted, secure facilities</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Database className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Your Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Full control over your personal data</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="prose prose-gray max-w-none p-8">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect information you provide directly to us, such as:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Name, email address, and phone number</li>
                  <li>Delivery addresses (pickup and drop-off locations)</li>
                  <li>Payment information (processed securely by third-party providers)</li>
                  <li>Package details and special instructions</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Device information and IP address</li>
                  <li>Usage data and app interactions</li>
                  <li>Location data (only when using our services)</li>
                  <li>Delivery tracking and status information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide and improve our drone delivery services</li>
                  <li>Process payments and send delivery confirmations</li>
                  <li>Communicate with you about your deliveries</li>
                  <li>Ensure safety and security of our operations</li>
                  <li>Comply with legal obligations and regulations</li>
                  <li>Analyze usage patterns to improve our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    <strong>Service Providers:</strong> Trusted partners who assist in delivering our services
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or to protect our rights
                  </li>
                  <li>
                    <strong>Safety and Security:</strong> To ensure the safety of our operations and users
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with mergers or acquisitions
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Drone Camera and Sensor Data</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our drones are equipped with cameras and sensors for navigation and safety purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Cameras are used solely for obstacle avoidance and navigation</li>
                  <li>No video or images are recorded or stored</li>
                  <li>Automatic privacy filtering prevents identification of individuals</li>
                  <li>Sensor data is used only for flight safety and route optimization</li>
                  <li>All navigation data is deleted after successful delivery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement comprehensive security measures to protect your information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>End-to-end encryption for all data transmission</li>
                  <li>Secure, encrypted storage in certified data centers</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and employee background checks</li>
                  <li>Compliance with industry security standards</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    <strong>Access:</strong> Request a copy of your personal data
                  </li>
                  <li>
                    <strong>Correction:</strong> Update or correct inaccurate information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal data
                  </li>
                  <li>
                    <strong>Portability:</strong> Receive your data in a portable format
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing communications
                  </li>
                  <li>
                    <strong>Restriction:</strong> Limit how we process your information
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information only as long as necessary to provide our services and comply with
                  legal obligations. Delivery data is typically retained for 2 years for customer service and regulatory
                  purposes, after which it is securely deleted.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If we become aware that we have collected such information, we
                  will take steps to delete it promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you are located outside the United States, please note that we may transfer your information to and
                  process it in the United States. We ensure appropriate safeguards are in place to protect your
                  information in accordance with applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by
                  posting the new policy on our website and sending you an email notification. Your continued use of our
                  services after such modifications constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>SkyDeliver Privacy Team</strong>
                    <br />
                    Email: privacy@skydeliver.com
                    <br />
                    Phone: 1-800-SKY-PRIVACY
                    <br />
                    Address: 123 Innovation Drive, San Francisco, CA 94105
                  </p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
