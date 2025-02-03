import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import ParcelFormFields from "./parcel/ParcelFormFields";
import ParcelPhotoUpload from "./parcel/ParcelPhotoUpload";

export type Parcel = {
  id: string;
  lr_no: string;
  date: string;
  no_of_parcels: number;
  item_name: string;
  quantity: number;
  item_photo: string | null;
  parcel_photo: string | null;
  user_id: string;
  created_at?: string;
  updated_at?: string;
};

const ParcelForm = ({ initialData = null }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    lr_no: "",
    no_of_parcels: "",
    date: "",
    item_name: "",
    quantity: "",
    parcel_photo: null,
    item_photo: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        lr_no: initialData.lr_no || "",
        no_of_parcels: initialData.no_of_parcels || "",
        date: initialData.date || "",
        item_name: initialData.item_name || "",
        quantity: initialData.quantity || "",
        parcel_photo: initialData.parcel_photo || null,
        item_photo: initialData.item_photo || null,
      });
    }
  }, [initialData]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Canvas to Blob conversion failed'));
              }
            },
            'image/jpeg',
            0.7
          );
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'item_photo' | 'parcel_photo') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Compress the image
        const compressedBlob = await compressImage(file);
        const base64String = await convertToBase64(new File([compressedBlob], file.name, { type: 'image/jpeg' }));
        
        setFormData(prev => ({
          ...prev,
          [type]: base64String
        }));
        
        toast({
          title: "Success",
          description: `${type === 'item_photo' ? 'Item' : 'Parcel'} photo uploaded successfully`,
        });
      } catch (error) {
        console.error('Error processing image:', error);
        toast({
          title: "Error",
          description: "Failed to upload photo",
          variant: "destructive",
        });
      }
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action",
        variant: "destructive",
      });
      return;
    }

    try {
      const parcelData = {
        lr_no: formData.lr_no,
        no_of_parcels: parseInt(formData.no_of_parcels as string),
        date: formData.date,
        item_name: formData.item_name,
        quantity: parseInt(formData.quantity as string),
        parcel_photo: formData.parcel_photo,
        item_photo: formData.item_photo,
        user_id: user.id,
      };

      let response;
      
      if (initialData) {
        response = await supabase
          .from('parcels')
          .update(parcelData)
          .eq('id', initialData.id);
      } else {
        response = await supabase
          .from('parcels')
          .insert(parcelData);
      }

      if (response.error) {
        throw response.error;
      }

      toast({
        title: "Success",
        description: initialData ? "Parcel updated successfully" : "Parcel added successfully",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error('Error saving parcel:', error);
      toast({
        title: "Error",
        description: "Failed to save parcel",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center mb-8">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-foreground hover:text-foreground/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <ParcelFormFields 
            formData={formData}
            onChange={handleFieldChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ParcelPhotoUpload
              id="parcel_photo"
              label="Parcel Photo"
              photo={formData.parcel_photo}
              onPhotoChange={(e) => handleFileChange(e, 'parcel_photo')}
            />

            <ParcelPhotoUpload
              id="item_photo"
              label="Item Photo"
              photo={formData.item_photo}
              onPhotoChange={(e) => handleFileChange(e, 'item_photo')}
            />
          </div>

          <div className="flex justify-end mt-8">
            <Button type="submit" className="w-full md:w-auto">
              {initialData ? "Update Parcel" : "Add Parcel"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParcelForm;