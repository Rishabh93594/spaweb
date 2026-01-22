import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, MessageSquare, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSearchParams } from 'react-router-dom';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: initialService,
    notes: ''
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM'
  ];

  const services = [
    { id: 'post-op-bbl', name: 'Post-Op Lymphatic Drainage BBL', price: '₹15,000' },
    { id: 'micro-needling', name: 'Micro-needling', price: '₹8,500' },
    { id: 'advanced-facials', name: 'Advanced Facials', price: '₹5,500' },
    { id: 'laser-services', name: 'Laser Services', price: '₹12,000' },
    { id: 'signature-massage', name: 'Signature Massage', price: '₹2,500' },
    { id: 'deep-tissue', name: 'Deep Tissue Therapy', price: '₹3,500' },
    { id: 'couples-massage', name: 'Couples Massage Ritual', price: '₹6,500' },
  ];

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-stone-50/50">
      <Navbar forceOpaque={true} />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
            Book Your <span className="text-amber-600">Experience</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-200 text-stone-400'}`}>1</div>
            <div className={`h-px w-8 bg-stone-200 ${step >= 2 ? 'bg-amber-600' : ''}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-200 text-stone-400'}`}>2</div>
            <div className={`h-px w-8 bg-stone-200 ${step >= 3 ? 'bg-amber-600' : ''}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-200 text-stone-400'}`}>3</div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-stone-100 overflow-hidden">
            <CardHeader className="text-center border-b border-stone-100 bg-stone-50/50 p-8">
              <CardTitle className="text-2xl font-serif text-stone-800">
                {step === 1 && "Select Preferred Date"}
                {step === 2 && "Choose Time Slot"}
                {step === 3 && "Finalize Your Booking"}
              </CardTitle>
              <CardDescription className="text-stone-600 mt-2">
                {step === 1 && "Start by picking a date that works best for you"}
                {step === 2 && `Availability for ${selectedDate ? format(selectedDate, 'PPP') : ''}`}
                {step === 3 && "Complete the form to request your appointment"}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              {step === 1 && (
                <div className="p-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="bg-white p-6 rounded-3xl shadow-luxury-soft border border-stone-100">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        if (date) handleNext();
                      }}
                      className="rounded-3xl border-0 p-4"
                      classNames={{
                        month: "space-y-6",
                        caption: "flex justify-center pt-2 relative items-center mb-4",
                        caption_label: "text-lg md:text-xl font-serif font-bold text-stone-800",
                        nav_button: "h-12 w-12 bg-stone-100 hover:bg-amber-100 hover:text-amber-600 transition-all border-0 rounded-xl shadow-sm",
                        table: "w-full border-collapse",
                        head_row: "flex mb-4 gap-2",
                        head_cell: "text-stone-600 font-black w-16 text-xs uppercase tracking-tighter",
                        row: "flex w-full mt-3 gap-2",
                        cell: "h-16 w-16 text-center text-base p-0 relative [&:has([aria-selected])]:bg-transparent",
                        day: "h-16 w-16 p-0 font-bold text-stone-800 aria-selected:opacity-100 hover:bg-amber-100 rounded-2xl transition-all border border-transparent shadow-sm bg-white/50",
                        day_selected: "bg-amber-600 !text-white hover:bg-amber-700 shadow-xl shadow-amber-600/40 scale-110 z-10 border-amber-500",
                        day_today: "bg-stone-100 !text-black font-black border-2 border-amber-400",
                        day_outside: "text-stone-400 opacity-40",
                        day_disabled: "text-stone-400 opacity-80 cursor-not-allowed bg-stone-50/50",
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </div>
                  <p className="mt-8 text-sm text-stone-400 font-light italic">
                    * Available dates are highlighted. Click to proceed.
                  </p>
                </div>
              )}

              {step === 2 && (
                <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setSelectedTime(time);
                          handleNext();
                        }}
                        className={`py-4 px-2 rounded-xl border text-sm font-medium transition-all duration-300
                          ${selectedTime === time
                            ? 'bg-amber-600 border-amber-600 text-white shadow-lg scale-105'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-amber-400 hover:bg-stone-50'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-center">
                    <Button variant="ghost" onClick={handleBack} className="text-stone-500 hover:text-amber-600 flex items-center gap-2">
                      <ChevronLeft className="w-4 h-4" /> Change Date
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="bg-amber-50/50 rounded-2xl p-6 mb-8 border border-amber-100/50 flex flex-wrap gap-6 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-amber-100">
                        <CalendarIcon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Selected Date</p>
                        <p className="text-stone-800 font-medium">{selectedDate ? format(selectedDate, 'PPP') : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-amber-100">
                        <Clock className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Selected Time</p>
                        <p className="text-stone-800 font-medium">{selectedTime || 'N/A'}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setStep(1)} className="rounded-full border-amber-200 text-amber-700 hover:bg-amber-50">
                      Change Details
                    </Button>
                  </div>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-stone-500 flex items-center gap-2 px-1">
                          <User className="w-3 h-3" /> Full Name
                        </label>
                        <Input
                          placeholder="Your Name"
                          className="h-12 border-stone-200 rounded-xl focus:ring-amber-500/20"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-stone-500 flex items-center gap-2 px-1">
                          <Phone className="w-3 h-3" /> Phone Number
                        </label>
                        <Input
                          placeholder="Your Phone"
                          className="h-12 border-stone-200 rounded-xl focus:ring-amber-500/20"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-stone-500 flex items-center gap-2 px-1">
                        <Mail className="w-3 h-3" /> Email Address
                      </label>
                      <Input
                        placeholder="Your Email"
                        type="email"
                        className="h-12 border-stone-200 rounded-xl focus:ring-amber-500/20"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-stone-500 px-1">Select Service</label>
                      <Select
                        value={formData.service}
                        onValueChange={(val) => setFormData({ ...formData, service: val })}
                      >
                        <SelectTrigger className="h-12 border-stone-200 rounded-xl">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map(s => (
                            <SelectItem key={s.id} value={s.id}>{s.name} - {s.price}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-stone-500 flex items-center gap-2 px-1">
                        <MessageSquare className="w-3 h-3" /> Special Requests
                      </label>
                      <Textarea
                        placeholder="Anything else we should know?"
                        className="border-stone-200 rounded-xl focus:ring-amber-500/20 min-h-[100px]"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button variant="ghost" type="button" onClick={handleBack} className="h-14 px-8 rounded-full">
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-lg shadow-xl shadow-amber-600/20 transition-all active:scale-95"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Booking request submitted! We will contact you soon.');
                        }}
                      >
                        Complete Booking
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
