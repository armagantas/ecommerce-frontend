import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Başlık en az 5 karakter olmalıdır.",
  }),
  description: z.string().min(10, {
    message: "Açıklama en az 10 karakter olmalıdır.",
  }),
  categoryId: z.string().min(1, {
    message: "Lütfen bir kategori seçin.",
  }),
  quantity: z.coerce.number().int().min(1, {
    message: "Miktar en az 1 olmalıdır.",
  }),
  price: z.coerce.number().min(0.01, {
    message: "Fiyat 0'dan büyük olmalıdır.",
  }),
  image: z.string().url({
    message: "Lütfen geçerli bir görsel URL'si girin.",
  }),
});

const categories = [
  { id: "1", name: "Elektronik" },
  { id: "2", name: "Moda" },
  { id: "3", name: "Ev & Bahçe" },
  { id: "4", name: "Spor & Outdoor" },
  { id: "5", name: "Güzellik & Kişisel Bakım" },
  { id: "6", name: "Otomotiv" },
  { id: "7", name: "Kitaplar" },
  { id: "8", name: "Oyuncaklar & Oyunlar" },
];

const CreateRequestPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      quantity: 1,
      price: 0,
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast.error("Kimlik doğrulama gerekli", {
        description: "Ürün talebi oluşturmak için lütfen giriş yapın",
      });
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);

    try {
      const requestBody = {
        title: values.title,
        description: values.description,
        categoryId: parseInt(values.categoryId),
        quantity: values.quantity,
        price: values.price,
        image: values.image,
      };

      console.log("Ürün talebi oluşturuluyor:", requestBody);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Başarılı!", {
        description: "Ürün talebiniz oluşturuldu.",
      });

      navigate("/products");
    } catch (error) {
      console.error("Ürün talebi oluşturma hatası:", error);
      toast.error("Hata", {
        description: "Ürün talebi oluşturulamadı. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Ürün Talebi Oluştur</CardTitle>
          <CardDescription>
            Yeni bir ürün talebi oluşturmak için formu doldurun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlık</FormLabel>
                    <FormControl>
                      <Input placeholder="Ürün başlığını girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ne aradığınızı açıklayın"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Bir kategori seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Miktar</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fiyat</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="99.99"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Görsel URL'si</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://ornek.com/gorsel.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Oluşturuluyor...
                  </>
                ) : (
                  "Talep Oluştur"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRequestPage;
