'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Phone, Mail, Clock, Download } from 'lucide-react';
import Link from 'next/link';

export function AdmissionsForm() {
  return (
    <section
      className="px-4 py-20 flex justify-center bg-white"
      id="application-form"
    >
      <div className="w-full max-w-6xl">
        <div className="bg-surface rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col lg:flex-row">
          {/* Contact Sidebar */}
          <div className="lg:w-1/3 bg-slate-900 text-white p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">Contact Admissions</h3>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Have questions before you apply? Our admissions team is here to
                help guide you through the process.
              </p>
              <ul className="flex flex-col gap-6">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">
                      Phone
                    </p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">
                      Email
                    </p>
                    <p className="font-medium">admissions@futureacademy.edu</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">
                      Office Hours
                    </p>
                    <p className="font-medium">Mon-Fri, 8:00 AM - 4:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative z-10 mt-12 pt-12 border-t border-slate-800">
              <p className="text-sm text-slate-400 mb-4">
                Looking for tuition fees?
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-white transition-colors"
              >
                Download Fee Structure
                <Download className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:w-2/3 p-10 lg:p-14 bg-white">
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-text-main mb-2">
                Admission Inquiry Form
              </h3>
              <p className="text-text-muted">
                Fill out the form below to express your interest. We will get
                back to you within 24 hours.
              </p>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="parent-name" className="mb-2 font-bold">
                  Parent/Guardian Name
                </Label>
                <Input
                  id="parent-name"
                  placeholder="John Doe"
                  className="rounded-xl border-slate-200 focus:ring-primary"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="email" className="mb-2 font-bold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="rounded-xl border-slate-200 focus:ring-primary"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="phone" className="mb-2 font-bold">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="rounded-xl border-slate-200 focus:ring-primary"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="grade" className="mb-2 font-bold">
                  Grade Applying For
                </Label>
                <Select>
                  <SelectTrigger className="rounded-xl border-slate-200 focus:ring-primary">
                    <SelectValue placeholder="Select a grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nursery">Nursery</SelectItem>
                    <SelectItem value="kindergarten">Kindergarten</SelectItem>
                    <SelectItem value="primary">
                      Primary School (Grades 1-5)
                    </SelectItem>
                    <SelectItem value="middle">
                      Middle School (Grades 6-8)
                    </SelectItem>
                    <SelectItem value="high">High School / College</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="child-name" className="mb-2 font-bold">
                  Child's Name
                </Label>
                <Input
                  id="child-name"
                  placeholder="Full Name of Student"
                  className="rounded-xl border-slate-200 focus:ring-primary"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="message" className="mb-2 font-bold">
                  Additional Information
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your child's interests or any specific questions you have."
                  rows={3}
                  className="rounded-xl border-slate-200 focus:ring-primary"
                />
              </div>
              <div className="col-span-2 pt-4">
                <Button
                  className="w-full md:w-auto px-8 py-4 rounded-full hover:-translate-y-1 hover:shadow-glow"
                  size="lg"
                >
                  Submit Inquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
