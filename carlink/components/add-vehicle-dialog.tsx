'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VehicleForm } from "@/components/vehicle-form";
import { VehicleFormData } from "@/types/vehicle";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddVehicleDialogProps {
  onAddVehicle: (data: VehicleFormData, imageFile: File) => Promise<void>;
  isLoading?: boolean;
}

export function AddVehicleDialog({ onAddVehicle, isLoading }: AddVehicleDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: VehicleFormData, imageFile: File) => {
    await onAddVehicle(data, imageFile);
    setOpen(false); // Close the dialog after successful submission
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new vehicle to your collection.
          </DialogDescription>
        </DialogHeader>
        <VehicleForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
} 