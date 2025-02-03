import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ParcelFormFields from "./parcel/ParcelFormFields";
import ParcelPhotoUpload from "./parcel/ParcelPhotoUpload";
import { useParcelForm } from "@/hooks/useParcelForm";

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
  const { formData, handleFieldChange, handleFileChange, handleSubmit } = useParcelForm(initialData);

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