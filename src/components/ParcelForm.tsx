import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";

// Define the Parcel type
export type Parcel = {
  id: string;
  lrNo: string;
  date: string;
  noOfParcels: number;
  itemName: string;
  quantity: number;
  itemPhoto: string | null;
  parcelPhoto: string | null;
  user_id: string;
};

const ParcelForm = ({ initialData = null }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    lrNo: "",
    date: "",
    noOfParcels: "",
    itemName: "",
    quantity: "",
    itemPhoto: null,
    parcelPhoto: null,
  });

  // Load initial data when component mounts
  useEffect(() => {
    if (initialData) {
      setFormData({
        lrNo: initialData.lrNo || "",
        date: initialData.date || "",
        noOfParcels: initialData.noOfParcels || "",
        itemName: initialData.itemName || "",
        quantity: initialData.quantity || "",
        itemPhoto: initialData.itemPhoto || null,
        parcelPhoto: initialData.parcelPhoto || null,
      });
    }
  }, [initialData]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'itemPhoto' | 'parcelPhoto') => {
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
          description: `${type === 'itemPhoto' ? 'Item' : 'Parcel'} photo uploaded successfully`,
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
        ...formData,
        noOfParcels: parseInt(formData.noOfParcels as string),
        quantity: parseInt(formData.quantity as string),
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
          .insert([parcelData]);
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
          <Label htmlFor="lrNo">LR Number</Label>
          <Input
            id="lrNo"
            value={formData.lrNo}
            onChange={(e) =>
              setFormData({ ...formData, lrNo: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
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
          <Label htmlFor="noOfParcels">Number of Parcels</Label>
          <Input
            id="noOfParcels"
            type="number"
            value={formData.noOfParcels}
            onChange={(e) =>
              setFormData({ ...formData, noOfParcels: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="itemName">Item Name</Label>
          <Input
            id="itemName"
            value={formData.itemName}
            onChange={(e) =>
              setFormData({ ...formData, itemName: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
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
          <Label htmlFor="itemPhoto">Item Photo</Label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {formData.itemPhoto ? (
                  <img src={formData.itemPhoto} alt="Item" className="h-20 w-20 object-cover" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500">Click to upload item photo</p>
                  </>
                )}
              </div>
              <input 
                id="itemPhoto" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'itemPhoto')}
              />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="parcelPhoto">Parcel Photo</Label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {formData.parcelPhoto ? (
                  <img src={formData.parcelPhoto} alt="Parcel" className="h-20 w-20 object-cover" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500">Click to upload parcel photo</p>
                  </>
                )}
              </div>
              <input 
                id="parcelPhoto" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'parcelPhoto')}
              />
            </label>
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
