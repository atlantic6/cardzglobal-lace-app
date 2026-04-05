import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export function ImageUpload({ value, onChange, folder = "general", label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    const { error } = await supabase.storage.from("product-images").upload(fileName, file);

    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
    onChange(urlData.publicUrl);
    setUploading(false);
    toast.success("Image uploaded");
  };

  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{label}</label>
      <div className="flex items-start gap-3">
        {value ? (
          <div className="relative w-24 h-24 rounded border border-border overflow-hidden shrink-0">
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => onChange("")}
              className="absolute top-1 right-1 p-0.5 bg-background/80 rounded-full hover:bg-background"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded border border-dashed border-border flex items-center justify-center shrink-0">
            <ImageIcon size={20} className="text-muted-foreground" />
          </div>
        )}
        <div className="flex flex-col gap-2 flex-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary disabled:opacity-50"
          >
            <Upload size={12} /> {uploading ? "Uploading..." : "Upload Image"}
          </button>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL"
            className="w-full rounded-sm border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
    </div>
  );
}

interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  label?: string;
}

export function MultiImageUpload({ values, onChange, folder = "products", label = "Images" }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 5 * 1024 * 1024) continue;

      const ext = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

      const { error } = await supabase.storage.from("product-images").upload(fileName, file);
      if (!error) {
        const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
        newUrls.push(urlData.publicUrl);
      }
    }

    onChange([...values, ...newUrls]);
    setUploading(false);
    toast.success(`${newUrls.length} image(s) uploaded`);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {values.map((url, i) => (
          <div key={i} className="relative w-20 h-20 rounded border border-border overflow-hidden">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => removeImage(i)}
              className="absolute top-0.5 right-0.5 p-0.5 bg-background/80 rounded-full hover:bg-background"
            >
              <X size={10} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-20 h-20 rounded border border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:bg-secondary disabled:opacity-50"
        >
          <Upload size={14} />
          <span className="text-[10px]">{uploading ? "..." : "Add"}</span>
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
    </div>
  );
}
