import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { compressImage } from "@/utils/imageUtils";

export type ParcelFormData = {
  lr_no: string;
  no_of_parcels: string;
  date: string;
  item_name: string;
  quantity: string;
  parcel_photo: string | null;
  item_photo: string | null;
};

export const useParcelForm = (initialData: any = null) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState<ParcelFormData>({
    lr_no: initialData?.lr_no || "",
    no_of_parcels: initialData?.no_of_parcels || "",
    date: initialData?.date || "",
    item_name: initialData?.item_name || "",
    quantity: initialData?.quantity || "",
    parcel_photo: initialData?.parcel_photo || null,
    item_photo: initialData?.item_photo || null,
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'item_photo' | 'parcel_photo') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
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

  return {
    formData,
    handleFieldChange,
    handleFileChange,
    handleSubmit
  };
};