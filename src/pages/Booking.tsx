import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Booking = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      <Navbar forceOpaque={true} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
            Book Your <span className="text-amber-600">Experience</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Reserve your moment of tranquility. Our team is ready to provide you with an exceptional spa experience.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-amber-100">
            <CardHeader className="text-center border-b border-amber-100 bg-gradient-to-r from-amber-50 to-stone-50">
              <CardTitle className="text-2xl font-serif text-stone-800">Appointment Request</CardTitle>
              <CardDescription className="text-stone-600">
                Fill out the form below and we'll confirm your booking within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-amber-600" />
                      Full Name
                    </label>
                    <Input 
                      placeholder="Enter your full name" 
                      className="border-stone-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-600" />
                      Phone Number
                    </label>
                    <Input 
                      placeholder="Enter your phone number" 
                      type="tel"
                      className="border-stone-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-600" />
                    Email Address
                  </label>
                  <Input 
                    placeholder="Enter your email address" 
                    type="email"
                    className="border-stone-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                </div>

                {/* Service Selection */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      Preferred Date
                    </label>
                    <Input 
                      type="date"
                      className="border-stone-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      Preferred Time
                    </label>
                    <Select>
                      <SelectTrigger className="border-stone-200 focus:border-amber-400 focus:ring-amber-400">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Service</label>
                  <Select>
                    <SelectTrigger className="border-stone-200 focus:border-amber-400 focus:ring-amber-400">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="signature-massage">Signature Massage - ₹2,500</SelectItem>
                      <SelectItem value="deep-tissue">Deep Tissue Therapy - ₹3,500</SelectItem>
                      <SelectItem value="couples-massage">Couples Massage Ritual - ₹6,500</SelectItem>
                      <SelectItem value="classic-facial">Classic Facial - ₹2,000</SelectItem>
                      <SelectItem value="diamond-facial">Diamond Facial - ₹5,500</SelectItem>
                      <SelectItem value="gold-facial">24K Gold Facial - ₹4,500</SelectItem>
                      <SelectItem value="body-scrub">Body Scrub Treatment - ₹2,800</SelectItem>
                      <SelectItem value="salt-scrub">Himalayan Salt Scrub - ₹3,200</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                    Special Requests or Notes
                  </label>
                  <Textarea 
                    placeholder="Any special requests, allergies, or preferences we should know about?"
                    className="border-stone-200 focus:border-amber-400 focus:ring-amber-400 min-h-[120px]"
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Request Booking
                </Button>

                <p className="text-center text-sm text-stone-500">
                  By submitting this form, you agree to our booking policies. 
                  We'll contact you within 24 hours to confirm your appointment.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Card className="p-6 border-amber-100 hover:shadow-lg transition-shadow">
              <Phone className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-medium text-stone-800 mb-1">Call Us</h3>
              <p className="text-stone-600">+91 98765 43210</p>
            </Card>
            <Card className="p-6 border-amber-100 hover:shadow-lg transition-shadow">
              <Mail className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-medium text-stone-800 mb-1">Email Us</h3>
              <p className="text-stone-600">bookings@spa.com</p>
            </Card>
            <Card className="p-6 border-amber-100 hover:shadow-lg transition-shadow">
              <Clock className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-medium text-stone-800 mb-1">Hours</h3>
              <p className="text-stone-600">10 AM - 8 PM Daily</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
