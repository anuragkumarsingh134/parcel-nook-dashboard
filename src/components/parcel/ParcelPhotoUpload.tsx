import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface ParcelPhotoUploadProps {
  id: string;
  label: string;
  photo: string | null;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ParcelPhotoUpload = ({ id, label, photo, onPhotoChange }: ParcelPhotoUploadProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="overflow-hidden rounded-lg border bg-muted">
        <AspectRatio ratio={4/3} className="bg-muted">
          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {photo ? (
                <img src={photo} alt={label} className="object-contain w-full h-full" />
              ) : (
                <>
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="text-sm text-gray-500">Click to upload {label.toLowerCase()}</p>
                </>
              )}
            </div>
            <input 
              id={id} 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={onPhotoChange}
            />
          </label>
        </AspectRatio>
      </div>
    </div>
  );
};

export default ParcelPhotoUpload;