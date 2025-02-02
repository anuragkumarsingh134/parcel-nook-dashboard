import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'item_photo' | 'parcel_photo') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64String = await convertToBase64(file);
        setFormData(prev => ({
          ...prev,
          [type]: base64String
        }));
        toast({
          title: "Success",
          description: `${type === 'item_photo' ? 'Item' : 'Parcel'} photo uploaded successfully`,
        });
      } catch (error) {
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <Button
        type="button"
        variant="ghost"
        onClick={() => navigate("/dashboard")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="lr_no">LR Number</Label>
          <Input
            id="lr_no"
            value={formData.lr_no}
            onChange={(e) =>
              setFormData({ ...formData, lr_no: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="no_of_parcels">Number of Parcels</Label>
          <Input
            id="no_of_parcels"
            type="number"
            value={formData.no_of_parcels}
            onChange={(e) =>
              setFormData({ ...formData, no_of_parcels: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Opening Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="item_name">Item Name</Label>
          <Input
            id="item_name"
            value={formData.item_name}
            onChange={(e) =>
              setFormData({ ...formData, item_name: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Item Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-2">
          <Label htmlFor="parcel_photo">Parcel Photo</Label>
          <div className="overflow-hidden rounded-lg border bg-muted">
            <AspectRatio ratio={4/3} className="bg-muted">
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {formData.parcel_photo ? (
                    <img src={formData.parcel_photo} alt="Parcel" className="object-contain w-full h-full" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">Click to upload parcel photo</p>
                    </>
                  )}
                </div>
                <input 
                  id="parcel_photo" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'parcel_photo')}
                />
              </label>
            </AspectRatio>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="item_photo">Item Photo</Label>
          <div className="overflow-hidden rounded-lg border bg-muted">
            <AspectRatio ratio={4/3} className="bg-muted">
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {formData.item_photo ? (
                    <img src={formData.item_photo} alt="Item" className="object-contain w-full h-full" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">Click to upload item photo</p>
                    </>
                  )}
                </div>
                <input 
                  id="item_photo" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'item_photo')}
                />
              </label>
            </AspectRatio>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button type="submit" className="w-full md:w-auto">
          {initialData ? "Update Parcel" : "Add Parcel"}
        </Button>
      </div>
    </form>
  );
};

export default ParcelForm;
