import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Mail, Linkedin, GraduationCap, University, Download, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  institution: string;
  inquiry: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    institution: "",
    inquiry: "",
    message: "",
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! I will get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        institution: "",
        inquiry: "",
        message: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleDownloadCV = () => {
    // In a real application, this would trigger a CV download
    toast({
      title: "CV Download",
      description: "CV download functionality would be implemented here.",
    });
  };

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-academic-blue mb-4">Contact & Collaboration</h2>
          <p className="text-xl text-academic-gray max-w-3xl mx-auto">
            Let's collaborate on cutting-edge research projects or discuss opportunities in academic and industry settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-academic-blue mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center" data-testid="contact-email">
                  <div className="bg-academic-blue-light/10 p-3 rounded-lg mr-4">
                    <Mail className="text-academic-blue-light" size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-academic-blue">himanshusr451tehs@gmail.com</div>
                    <div className="text-academic-gray text-sm">Email for research inquiries</div>
                  </div>
                </div>

                <div className="flex items-center" data-testid="contact-linkedin">
                  <div className="bg-academic-blue-light/10 p-3 rounded-lg mr-4">
                    <Linkedin className="text-academic-blue-light" size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-academic-blue">linkedin.com/in/himanshu-singh-552411251</div>
                    <div className="text-academic-gray text-sm">Professional networking</div>
                  </div>
                </div>


              </div>

              {/* CV Download */}
              <div className="mt-8 p-6 academic-gradient rounded-lg text-white">
                <h4 className="text-lg font-semibold mb-2">Download Academic CV</h4>
                <p className="text-blue-100 mb-4">
                  Complete academic curriculum vitae with detailed research experience, publications, and achievements.
                </p>
                <Button
                  onClick={handleDownloadCV}
                  className="bg-white text-academic-blue hover:bg-blue-50"
                  data-testid="button-download-cv"
                >
                  <Download size={16} className="mr-2" />
                  Download CV (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-academic-blue mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-academic-gray font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      className="mt-2"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-academic-gray font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="mt-2"
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="institution" className="text-academic-gray font-medium">
                    Institution/Organization
                  </Label>
                  <Input
                    id="institution"
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                    placeholder="Your institution"
                    className="mt-2"
                    data-testid="input-institution"
                  />
                </div>

                <div>
                  <Label htmlFor="inquiry" className="text-academic-gray font-medium">
                    Research Interest/Inquiry
                  </Label>
                  <Select
                    value={formData.inquiry}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, inquiry: value }))}
                  >
                    <SelectTrigger className="mt-2" data-testid="select-inquiry">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research-collaboration" data-testid="option-collaboration">
                        Research Collaboration
                      </SelectItem>
                      <SelectItem value="publication-inquiry" data-testid="option-publication">
                        Publication Inquiry
                      </SelectItem>
                      <SelectItem value="academic-opportunity" data-testid="option-academic">
                        Academic Opportunity
                      </SelectItem>
                      <SelectItem value="industry-partnership" data-testid="option-industry">
                        Industry Partnership
                      </SelectItem>
                      <SelectItem value="other" data-testid="option-other">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-academic-gray font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Please describe your inquiry or collaboration proposal..."
                    className="mt-2"
                    data-testid="textarea-message"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-academic-blue text-white hover:bg-academic-blue-light"
                  data-testid="button-send-message"
                >
                  {contactMutation.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
