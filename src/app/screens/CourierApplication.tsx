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
  city: string;
  driverLicenseImage: File | null;
  vehicleRegistrationImage: File | null;
  vehiclePhotoImage: File | null;
  idPhotoImage: File | null;
}

export function CourierApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Açık iller listesini localStorage'dan al
  const availableCities = JSON.parse(localStorage.getItem('availableCities') || '["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"]');
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licensePlate: '',
    vehicleType: 'motorcycle',
    registration: '',
    city: '',
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
    
    toast.success('✅ Başvurunuz başarıyla gönderildi! İncelendikten sonra size dönüş yapılacaktır.');
    setTimeout(() => navigate('/login'), 2000);
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.fullName && formData.email && formData.phone && formData.city;
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
          <h1 className="text-2xl font-bold mb-2">Kurye Ol</h1>
          <p className="text-gray-400 text-sm">Başvurunu tamamla ve kazanmaya başla</p>
          
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

      {/* Available Cities Info */}
      <div className="max-w-2xl mx-auto p-6 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-bold text-green-900 mb-2">Açık İller</h3>
              <div className="flex flex-wrap gap-2">
                {availableCities.map((city: string) => (
                  <span key={city} className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-green-700 shadow-sm">
                    {city}
                  </span>
                ))}
              </div>
              <p className="text-xs text-green-700 mt-2">
                Şu anda bu şehirlerde aktif olarak kurye alıyoruz!
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form Content */}
      <div className="max-w-2xl mx-auto px-6 pb-32">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-[#121212] mb-4">Kişisel Bilgiler</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Tam Ad Soyad *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Adınızı ve soyadınızı girin"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    E-posta Adresi *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    Telefon Numarası *
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
                  <Label htmlFor="city" className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    Çalışmak İstediğiniz Şehir *
                  </Label>
                  <select
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full h-12 px-3 rounded-lg border-2 border-gray-300 bg-white font-semibold focus:border-[#FFD600] focus:outline-none"
                  >
                    <option value="">Şehir seçin...</option>
                    {availableCities.map((city: string) => (
                      <option key={city} value={city}>📍 {city}</option>
                    ))}
                  </select>
                  {formData.city && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {formData.city} şehrinde çalışabilirsiniz!
                    </p>
                  )}
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
              <h2 className="text-xl font-bold text-[#121212] mb-4">Araç Bilgileri</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="licenseNumber" className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" />
                    Sürücü Belgesi Numarası *
                  </Label>
                  <Input
                    id="licenseNumber"
                    type="text"
                    placeholder="Ehliyet numaranızı girin"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="licensePlate" className="flex items-center gap-2 mb-2">
                    <Car className="w-4 h-4" />
                    Araç Plakası *
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
                    Araç Tipi *
                  </Label>
                  <select
                    id="vehicleType"
                    value={formData.vehicleType}
                    onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                    className="w-full h-12 px-3 rounded-lg border-2 border-gray-300 bg-white font-semibold focus:border-[#FFD600] focus:outline-none"
                  >
                    <option value="motorcycle">🏍️ Motosiklet</option>
                    <option value="bicycle">🚲 Bisiklet</option>
                    <option value="car">🚗 Araba</option>
                    <option value="scooter">🛵 Scooter</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="registration" className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" />
                    Araç Ruhsat Numarası *
                  </Label>
                  <Input
                    id="registration"
                    type="text"
                    placeholder="Ruhsat numaranızı girin"
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
              <h2 className="text-xl font-bold text-[#121212] mb-4">Belge Yüklemeleri</h2>
              <p className="text-gray-600 text-sm mb-6">Belgelerinizin net fotoğraflarını yükleyin</p>
              
              <div className="space-y-4">
                <FileUploadCard
                  label="Sürücü Belgesi Fotoğrafı"
                  file={formData.driverLicenseImage}
                  onFileSelect={(file) => handleFileUpload('driverLicenseImage', file)}
                />
                
                <FileUploadCard
                  label="Araç Ruhsatı Fotoğrafı"
                  file={formData.vehicleRegistrationImage}
                  onFileSelect={(file) => handleFileUpload('vehicleRegistrationImage', file)}
                />
                
                <FileUploadCard
                  label="Araç Fotoğrafı"
                  file={formData.vehiclePhotoImage}
                  onFileSelect={(file) => handleFileUpload('vehiclePhotoImage', file)}
                />
                
                <FileUploadCard
                  label="Kimlik Fotoğrafı"
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
              Geri
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
                Başvuruyu Gönder
              </>
            ) : (
              <>
                Devam Et
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