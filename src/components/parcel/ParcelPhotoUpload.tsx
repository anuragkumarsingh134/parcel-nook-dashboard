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
      <Label htmlFor={id} className="text-foreground">{label}</Label>
      <div className="overflow-hidden rounded-lg border border-input">
        <AspectRatio ratio={4/3}>
          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-background hover:bg-muted/50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {photo ? (
                <img src={photo} alt={label} className="object-contain w-full h-full" />
              ) : (
                <>
                  <Upload className="w-8 h-8 mb-2 text-foreground/60" />
                  <p className="text-sm text-foreground/60">Click to upload {label.toLowerCase()}</p>
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