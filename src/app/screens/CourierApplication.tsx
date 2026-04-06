import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  Upload, 
  User, 
  Phone, 
  Mail, 
  Car, 
  MapPin, 
  FileText,
  CheckCircle,
  Camera,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licensePlate: string;
  vehicleType: string;
  registration: string;
  location: string;
  driverLicenseImage: File | null;
  vehicleRegistrationImage: File | null;
  vehiclePhotoImage: File | null;
  idPhotoImage: File | null;
}

export function CourierApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licensePlate: '',
    vehicleType: 'motorcycle',
    registration: '',
    location: '',
    driverLicenseImage: null,
    vehicleRegistrationImage: null,
    vehiclePhotoImage: null,
    idPhotoImage: null,
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUpload = (field: keyof FormData, file: File) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Mock submission - in real app this would send to backend
    const applications = JSON.parse(localStorage.getItem('courierApplications') || '[]');
    applications.push({
      id: Date.now(),
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      // Convert files to mock URLs for display
      driverLicenseImage: formData.driverLicenseImage?.name || null,
      vehicleRegistrationImage: formData.vehicleRegistrationImage?.name || null,
      vehiclePhotoImage: formData.vehiclePhotoImage?.name || null,
      idPhotoImage: formData.idPhotoImage?.name || null,
    });
    localStorage.setItem('courierApplications', JSON.stringify(applications));
    
    toast.success('Application submitted successfully!');
    setTimeout(() => navigate('/login'), 2000);
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.fullName && formData.email && formData.phone && formData.location;
    }
    if (step === 2) {
      return formData.licenseNumber && formData.licensePlate && formData.vehicleType && formData.registration;
    }
    if (step === 3) {
      return formData.driverLicenseImage && formData.vehicleRegistrationImage && 
             formData.vehiclePhotoImage && formData.idPhotoImage;
    }
    return false;
  };

  return (
    <div className="fixed inset-0 bg-white overflow-y-auto">
      {/* Header */}
      <div className="bg-[#121212] text-white p-6 sticky top-0 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-2xl font-bold mb-2">Become a Courier</h1>
          <p className="text-gray-400 text-sm">Complete your application to start earning</p>
          
          {/* Progress bar */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-[#FFD600]' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Form Content */}
      <div className="max-w-2xl mx-auto p-6 pb-32">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-[#121212] mb-4">Personal Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+90 5XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    Preferred Working Location *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., Istanbul - Kadıköy"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-[#121212] mb-4">Vehicle Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="licenseNumber" className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" />
                    Driver's License Number *
                  </Label>
                  <Input
                    id="licenseNumber"
                    type="text"
                    placeholder="Enter license number"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="licensePlate" className="flex items-center gap-2 mb-2">
                    <Car className="w-4 h-4" />
                    License Plate *
                  </Label>
                  <Input
                    id="licensePlate"
                    type="text"
                    placeholder="34 ABC 123"
                    value={formData.licensePlate}
                    onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="vehicleType" className="flex items-center gap-2 mb-2">
                    <Car className="w-4 h-4" />
                    Vehicle Type *
                  </Label>
                  <select
                    id="vehicleType"
                    value={formData.vehicleType}
                    onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                    className="w-full h-12 px-3 rounded-lg border border-gray-300 bg-white"
                  >
                    <option value="motorcycle">Motorcycle</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="car">Car</option>
                    <option value="scooter">Scooter</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="registration" className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" />
                    Vehicle Registration Number *
                  </Label>
                  <Input
                    id="registration"
                    type="text"
                    placeholder="Enter registration number"
                    value={formData.registration}
                    onChange={(e) => handleInputChange('registration', e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-[#121212] mb-4">Document Upload</h2>
              <p className="text-gray-600 text-sm mb-6">Upload clear photos of your documents</p>
              
              <div className="space-y-4">
                <FileUploadCard
                  label="Driver's License Photo"
                  file={formData.driverLicenseImage}
                  onFileSelect={(file) => handleFileUpload('driverLicenseImage', file)}
                />
                
                <FileUploadCard
                  label="Vehicle Registration Photo"
                  file={formData.vehicleRegistrationImage}
                  onFileSelect={(file) => handleFileUpload('vehicleRegistrationImage', file)}
                />
                
                <FileUploadCard
                  label="Vehicle Photo"
                  file={formData.vehiclePhotoImage}
                  onFileSelect={(file) => handleFileUpload('vehiclePhotoImage', file)}
                />
                
                <FileUploadCard
                  label="ID Photo"
                  file={formData.idPhotoImage}
                  onFileSelect={(file) => handleFileUpload('idPhotoImage', file)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex gap-3">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="w-24"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 h-12 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-semibold rounded-xl disabled:opacity-50"
          >
            {step === 3 ? (
              <>
                <CheckCircle className="mr-2 w-5 h-5" />
                Submit Application
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function FileUploadCard({ 
  label, 
  file, 
  onFileSelect 
}: { 
  label: string; 
  file: File | null; 
  onFileSelect: (file: File) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-[#FFD600] transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#FFD600]/10 rounded-lg flex items-center justify-center">
            {file ? (
              <CheckCircle className="w-6 h-6 text-[#FFD600]" />
            ) : (
              <Camera className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div>
            <p className="font-semibold text-[#121212]">{label}</p>
            <p className="text-sm text-gray-500">
              {file ? file.name : 'No file selected'}
            </p>
          </div>
        </div>
        <label htmlFor={`file-${label}`}>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer"
            asChild
          >
            <span>
              <Upload className="w-4 h-4 mr-2" />
              {file ? 'Change' : 'Upload'}
            </span>
          </Button>
          <input
            id={`file-${label}`}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
