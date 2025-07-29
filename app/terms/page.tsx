"use client"

import { ArrowLeft, Package } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: January 15, 2024</p>
        </div>

        <Card>
          <CardContent className="prose prose-gray max-w-none p-8">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using SkyDeliver's drone delivery services, you accept and agree to be bound by the
                  terms and provision of this agreement. If you do not agree to abide by the above, please do not use
                  this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  SkyDeliver provides autonomous drone delivery services for packages weighing up to 5 kilograms within
                  designated service areas. Our services include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Package pickup and delivery via autonomous drones</li>
                  <li>Real-time tracking and status updates</li>
                  <li>Customer support and assistance</li>
                  <li>Insurance coverage up to $500 per package</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Prohibited Items</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The following items are strictly prohibited from drone delivery:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Hazardous materials, chemicals, or flammable substances</li>
                  <li>Weapons, ammunition, or explosive devices</li>
                  <li>Illegal drugs or controlled substances</li>
                  <li>Live animals or perishable biological materials</li>
                  <li>Liquids exceeding 100ml in volume</li>
                  <li>Fragile items without proper packaging</li>
                  <li>Items exceeding 5kg in weight or dimensional limits</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibilities</h2>
                <p className="text-gray-700 leading-relaxed mb-4">As a user of SkyDeliver services, you agree to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide accurate pickup and delivery addresses</li>
                  <li>Ensure packages comply with weight and size restrictions</li>
                  <li>Be available at specified pickup and delivery times</li>
                  <li>Report any issues or damages within 24 hours</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pricing and Payment</h2>
                <p className="text-gray-700 leading-relaxed">
                  Delivery fees are calculated based on distance, package weight, delivery speed, and current demand.
                  All prices are displayed before order confirmation. Payment is required at the time of booking. We
                  accept major credit cards, PayPal, and Apple Pay. Refunds are available for cancelled orders before
                  drone dispatch.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Delivery Limitations</h2>
                <p className="text-gray-700 leading-relaxed">
                  Drone deliveries are subject to weather conditions, airspace restrictions, and regulatory
                  requirements. We reserve the right to cancel or reschedule deliveries due to safety concerns,
                  including but not limited to severe weather, air traffic restrictions, or technical issues.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Liability and Insurance</h2>
                <p className="text-gray-700 leading-relaxed">
                  SkyDeliver provides insurance coverage up to $500 per package for loss or damage during delivery. Our
                  liability is limited to the declared value of the package or $500, whichever is lower. We are not
                  liable for indirect, consequential, or punitive damages.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
                <p className="text-gray-700 leading-relaxed">
                  We collect and process personal data in accordance with our Privacy Policy. By using our services, you
                  consent to the collection and use of your information as described in our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  SkyDeliver reserves the right to modify these terms at any time. Users will be notified of significant
                  changes via email or through our platform. Continued use of our services after modifications
                  constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-gray-700">
                    <strong>SkyDeliver Legal Department</strong>
                    <br />
                    Email: legal@skydeliver.com
                    <br />
                    Phone: 1-800-SKY-LEGAL
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
