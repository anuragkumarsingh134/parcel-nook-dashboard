import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ParcelFormFieldsProps {
  formData: {
    lr_no: string;
    no_of_parcels: string;
    date: string;
    item_name: string;
    quantity: string;
  };
  onChange: (field: string, value: string) => void;
}

const ParcelFormFields = ({ formData, onChange }: ParcelFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="lr_no">LR Number</Label>
        <Input
          id="lr_no"
          value={formData.lr_no}
          onChange={(e) => onChange("lr_no", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="no_of_parcels">Number of Parcels</Label>
        <Input
          id="no_of_parcels"
          type="number"
          value={formData.no_of_parcels}
          onChange={(e) => onChange("no_of_parcels", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Opening Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => onChange("date", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="item_name">Item Name</Label>
        <Input
          id="item_name"
          value={formData.item_name}
          onChange={(e) => onChange("item_name", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Item Quantity</Label>
        <Input
          id="quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) => onChange("quantity", e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default ParcelFormFields;