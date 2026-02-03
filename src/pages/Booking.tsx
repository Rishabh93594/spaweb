import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, MessageSquare, ChevronLeft, ChevronRight, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSearchParams } from 'react-router-dom';
import { servicesData, addOns, categories, Service } from '@/data/services';
import { toast } from 'sonner';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const initialServiceId = searchParams.get('service');

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate ESTIMATED total (Display Only)
  const calculateTotal = () => {
    let total = selectedService ? selectedService.price : 0;
    selectedAddOns.forEach(addonId => {
      const addon = addOns.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });
    return total;
  };

  useEffect(() => {
    if (initialServiceId) {
      const service = servicesData.find(s => s.id === initialServiceId);
      if (service) {
        setSelectedService(service);
        // If service is pre-selected, we could technically skip to step 2, 
        // but it's often better to show the user what they selected first.
        // Let's stay on step 1 so they can confirm or change.
      }
    }
  }, [initialServiceId]);

  const handleNext = () => {
    if (step === 1 && !selectedService) {
      toast.error("Please select a service to continue");
      return;
    }
    if (step === 3 && (!selectedDate || !selectedTime)) {
      toast.error("Please select a date and time");
      return;
    }
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    // In a real app, you would send data to backend here
    setIsSubmitted(true);
    window.scrollTo(0, 0);
    toast.success("Request Submitted Details!");
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-stone-50/50">
        <Navbar forceOpaque={true} />
        <section className="pt-32 pb-20 px-4 min-h-[80vh] flex items-center justify-center">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-white p-12 rounded-3xl shadow-luxury border border-stone-100 animate-in zoom-in-95 duration-700">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10 text-primary" />
              </div>

              <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
                Request <span className="text-primary italic">Received</span>
              </h1>

              <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-lg mx-auto">
                Thank you, <span className="font-semibold text-stone-800">{formData.fullName}</span>. We successfully received your booking request for <span className="font-semibold text-primary">{selectedService?.name}</span>.
              </p>

              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 mb-10 text-left max-w-md mx-auto">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Next Steps</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 text-xs font-bold text-stone-400">1</div>
                    <p className="text-sm text-stone-600">Our concierge team will review your requested time slot.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 text-xs font-bold text-stone-400">2</div>
                    <p className="text-sm text-stone-600">You will receive a confirmation call or email at <span className="font-medium text-stone-800">{formData.email}</span> within 24 hours.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 text-xs font-bold text-stone-400">3</div>
                    <p className="text-sm text-stone-600">Payment will be collected at the spa on the day of your treatment.</p>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="rounded-full px-8 h-12 border-stone-200 hover:bg-stone-50" onClick={() => window.location.href = '/'}>
                  Return Home
                </Button>
                <Button className="rounded-full px-8 h-12 bg-primary text-white hover:bg-primary/90 shadow-lg" onClick={() => window.location.href = '/services'}>
                  Book Another Ritual
                </Button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/50">
      <Navbar forceOpaque={true} />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
            Book Your <span className="text-primary">Experience</span>
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 text-xs md:text-sm">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-stone-400'}`}>
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'bg-primary border-primary text-white' : 'border-stone-200'}`}>1</div>
              <span className="hidden md:inline">Service</span>
            </div>
            <div className={`h-px w-8 bg-stone-200 ${step >= 2 ? 'bg-primary' : ''}`} />

            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-stone-400'}`}>
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'bg-primary border-primary text-white' : 'border-stone-200'}`}>2</div>
              <span className="hidden md:inline">Enhancements</span>
            </div>
            <div className={`h-px w-8 bg-stone-200 ${step >= 3 ? 'bg-primary' : ''}`} />

            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-stone-400'}`}>
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'bg-primary border-primary text-white' : 'border-stone-200'}`}>3</div>
              <span className="hidden md:inline">Date & Time</span>
            </div>
            <div className={`h-px w-8 bg-stone-200 ${step >= 4 ? 'bg-primary' : ''}`} />

            <div className={`flex items-center gap-2 ${step >= 4 ? 'text-primary' : 'text-stone-400'}`}>
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 ${step >= 4 ? 'bg-primary border-primary text-white' : 'border-stone-200'}`}>4</div>
              <span className="hidden md:inline">Details</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Main Content Area */}
            <div className="flex-1">
              <Card className="shadow-2xl border-stone-100 overflow-hidden min-h-[500px]">
                <CardHeader className="border-b border-stone-100 bg-stone-50/50 p-6 md:p-8">
                  <CardTitle className="text-2xl font-serif text-stone-800">
                    {step === 1 && "Select Your Ritual"}
                    {step === 2 && "Enhance Your Experience (Optional)"}
                    {step === 3 && "Preferred Time"}
                    {step === 4 && "Guest Details"}
                  </CardTitle>
                  <CardDescription className="text-stone-600 mt-2">
                    {step === 1 && "Choose from our curated menu of treatments"}
                    {step === 2 && "Add complementary treatments to perfect your visit"}
                    {step === 3 && "Select a date and time that suits your schedule"}
                    {step === 4 && "We'll use this information to confirm your appointment"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  {/* STEP 1: Service Selection */}
                  {step === 1 && (
                    <div className="p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-500 max-h-[60vh] overflow-y-auto">
                      <div className="grid gap-8">
                        {categories.filter(cat => cat !== 'Additional Services').map(category => (
                          <div key={category}>
                            <h3 className="font-serif text-lg text-primary mb-4 border-b border-primary/10 pb-2">{category}</h3>
                            <div className="grid gap-3">
                              {servicesData.filter(s => s.category === category).map(service => (
                                <div
                                  key={service.id}
                                  onClick={() => setSelectedService(service)}
                                  className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center group
                                    ${selectedService?.id === service.id
                                      ? 'bg-primary/5 border-primary shadow-md'
                                      : 'bg-white border-stone-100 hover:border-primary/30 hover:shadow-sm'}`}
                                >
                                  <div>
                                    <div className="font-medium text-stone-800">{service.name}</div>
                                    <div className="text-xs text-stone-500 mt-1 flex gap-2">
                                      {service.duration && <span>{service.duration}</span>}
                                      {service.description && <span className="text-stone-400">• {service.description}</span>}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium text-primary">
                                      {service.price > 0 ? `$${service.price}` : 'Consultation'}
                                    </div>
                                    {selectedService?.id === service.id && (
                                      <Badge className="bg-primary mt-1">Selected</Badge>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Add-Ons */}
                  {step === 2 && (
                    <div className="p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="grid gap-4">
                        {addOns.map(addon => (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddOn(addon.id)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center group
                                ${selectedAddOns.includes(addon.id)
                                ? 'bg-primary/5 border-primary shadow-sm'
                                : 'bg-white border-stone-100 hover:border-primary/30'}`}
                          >
                            <div className="flex items-center gap-4">
                              <Checkbox checked={selectedAddOns.includes(addon.id)} onCheckedChange={() => toggleAddOn(addon.id)} />
                              <div>
                                <div className="font-medium text-stone-800">{addon.name}</div>
                                <div className="text-xs text-stone-500 mt-1">{addon.category}</div>
                              </div>
                            </div>
                            <div className="font-medium text-stone-600">
                              {addon.price > 0 ? `$${addon.price}` : 'Free'}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 p-4 bg-stone-50 rounded-lg border border-stone-100 text-sm text-stone-500 italic flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        You can skip this step if you don't wish to add any enhancements.
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Date & Time */}
                  {step === 3 && (
                    <div className="p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="w-full"
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            classNames={{
                              day_selected: "!bg-primary !text-white hover:!bg-primary/90",
                              day_today: "text-primary font-bold",
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-stone-800 mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            Available Slots
                          </h4>
                          <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 px-2 rounded-lg text-sm font-medium transition-all
                                  ${selectedTime === time
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-white border border-stone-200 text-stone-600 hover:border-primary/50 hover:bg-stone-50'}`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Lead Gen Form */}
                  {step === 4 && (
                    <div className="p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest font-bold text-stone-500 flex items-center gap-2 px-1">
                            <User className="w-3 h-3" /> Full Name
                          </label>
                          <Input
                            placeholder="Your Name"
                            className="h-12 border-stone-200 rounded-xl focus:ring-primary/20"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest font-bold text-stone-500 flex items-center gap-2 px-1">
                            <Phone className="w-3 h-3" /> Phone Number
                          </label>
                          <Input
                            placeholder="Your Phone"
                            className="h-12 border-stone-200 rounded-xl focus:ring-primary/20"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mt-6">
                        <label className="text-xs uppercase tracking-widest font-bold text-stone-500 flex items-center gap-2 px-1">
                          <Mail className="w-3 h-3" /> Email Address
                        </label>
                        <Input
                          placeholder="Your Email"
                          type="email"
                          className="h-12 border-stone-200 rounded-xl focus:ring-primary/20"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2 mt-6">
                        <label className="text-xs uppercase tracking-widest font-bold text-stone-500 flex items-center gap-2 px-1">
                          <MessageSquare className="w-3 h-3" /> Special Requests
                        </label>
                        <Textarea
                          placeholder="Anything else we should know?"
                          className="border-stone-200 rounded-xl focus:ring-primary/20 min-h-[100px]"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                      </div>

                      <div className="mt-6 flex items-start gap-2 text-xs text-stone-500 bg-stone-50 p-3 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-primary shrink-0" />
                        <p>No payment is required today. We will contact you to confirm your appointment details and answer any questions.</p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Footer */}
                  <div className="p-6 md:p-8 bg-stone-50/50 border-t border-stone-100 flex justify-between items-center">
                    {step > 1 ? (
                      <Button variant="ghost" onClick={handleBack} className="text-stone-500 hover:text-stone-800">
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back
                      </Button>
                    ) : (
                      <div></div> // Spacer
                    )}

                    {step < 4 ? (
                      <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
                        Next Step <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-luxury"
                      >
                        Request Appointment <Check className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sticky Summary Sidebar */}
            <div className="w-full lg:w-80">
              <div className="sticky top-24 space-y-4">
                <Card className="border-stone-100 shadow-lg">
                  <CardHeader className="pb-4 border-b border-stone-100">
                    <CardTitle className="text-lg font-serif">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">

                    {/* Selected Service */}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Service</p>
                      {selectedService ? (
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-stone-800 text-sm">{selectedService.name}</span>
                          <span className="text-stone-600 text-sm">${selectedService.price}</span>
                        </div>
                      ) : (
                        <span className="text-stone-400 text-sm italic">Not selected yet</span>
                      )}
                    </div>

                    {/* Selected Add-ons */}
                    {selectedAddOns.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Enhancements</p>
                        <div className="space-y-1">
                          {selectedAddOns.map(id => {
                            const addon = addOns.find(a => a.id === id);
                            return addon ? (
                              <div key={id} className="flex justify-between items-start text-sm">
                                <span className="text-stone-600">{addon.name}</span>
                                <span className="text-stone-500">+${addon.price}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Date & Time */}
                    {(selectedDate || selectedTime) && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">When</p>
                        <div className="flex flex-col text-sm text-stone-600">
                          {selectedDate && <span className="flex items-center gap-2"><CalendarIcon className="w-3 h-3" /> {format(selectedDate, 'PPP')}</span>}
                          {selectedTime && <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {selectedTime}</span>}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-stone-100 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-stone-800">Estimated Total</span>
                        <span className="font-serif text-xl text-primary">${calculateTotal()}</span>
                      </div>
                      <p className="text-[10px] text-stone-400 mt-2 text-center">
                        *Payment due at time of service
                      </p>
                    </div>

                  </CardContent>
                </Card>

                {/* Contact Info Card */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="bg-white p-2 rounded-full shadow-sm text-primary">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary">Need Help?</p>
                      <p className="text-xs text-stone-600 mt-1">Call us at (555) 123-4567 for immediate assistance with your booking.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
