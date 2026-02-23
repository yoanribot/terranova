"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Send } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const days = [
  { label: "Lunes", value: "01" },
  { label: "Martes", value: "02" },
  { label: "Miércoles", value: "03" },
  { label: "Jueves", value: "04" },
  { label: "Viernes", value: "05" },
  { label: "Sábado", value: "06" },
];

const time = [
  { label: "Mañana", value: "morning" },
  { label: "Tarde", value: "afternoon" },
];

const formSchema = z.object({
  name: z
    .string()
    .nonempty("El nombre es obligatorio.")
    .max(32, "El nombre debe tener como máximo 32 caracteres."),
  lastname: z
    .string()
    .nonempty("El apellido es obligatorio.")
    .max(50, "El apellido debe tener como máximo 50 caracteres."),
  phone: z.string(),
  email: z
    .string()
    .email("El correo electrónico no es válido.")
    .max(100, "El correo electrónico debe tener como máximo 100 caracteres."),
  message: z
    .string()
    .nonempty("El mensaje es obligatorio.")
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(500, "El mensaje debe tener como máximo 500 caracteres."),
  // time: z.array(z.string()).optional(),
  // day: z.array(z.string()).optional(),
});

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      lastname: "",
      phone: "",
      email: "",
      message: "",
      // time: [],
      // day: [],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Contact form error", error);
      setStatus("error");
    }
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className=" bg-white shadow-md px-5 md:px-10 py-10 md:rounded-lg"
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="flex justify-center items-center">
            <h4 className="text-2xl">Formulario de contacto</h4>
            <Send className="ml-2" />
          </FieldLegend>
          <FieldDescription>
            Escribenos un mensaje y nos pondremos en contacto contigo lo antes
            posible.
          </FieldDescription>

          <FieldGroup>
            <div className="md:flex gap-5">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Nombre</FieldLabel>

                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      required
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                    <Input
                      {...field}
                      id="phone"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Phone and Email */}
            <div className="md:flex gap-3">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="example@example.com"
                      required
                      type="email"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Availability */}
            {/* <div className="flex gap-3">
                <FieldGroup className="flex-1 gap-3">
                  <p> Horarios </p>
                  <Controller
                    name="time"
                    control={form.control}
                    render={({ field }) => (
                      <Field orientation="horizontal">
                        <ul>
                          {time.map((item) => (
                            <li key={item.value} className="flex gap-2 mb-1">
                              <Checkbox
                                id={item.value}
                                checked={field.value?.includes(item.label)}
                                onCheckedChange={(checked) => {
                                  const current = field.value ?? [];
                                  const next = checked
                                    ? [...current, item.label]
                                    : current.filter(
                                        (value) => value !== item.label,
                                      );
                                  field.onChange(next);
                                }}
                                className="self-center w-6 h-6"
                              />
                              <FieldLabel htmlFor={item.value}>
                                {item.label}
                              </FieldLabel>
                            </li>
                          ))}
                        </ul>
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup className="flex-1 gap-3">
                  <p> Dias </p>
                  <Controller
                    name="day"
                    control={form.control}
                    render={({ field }) => (
                      <Field orientation="horizontal">
                        <ul>
                          {days.map((item) => (
                            <li key={item.value} className="flex gap-2 mb-1">
                              <Checkbox
                                id={item.value}
                                checked={field.value?.includes(item.label)}
                                onCheckedChange={(checked) => {
                                  const current = field.value ?? [];
                                  const next = checked
                                    ? [...current, item.label]
                                    : current.filter(
                                        (value) => value !== item.label,
                                      );
                                  field.onChange(next);
                                }}
                                className="self-center w-6 h-6"
                              />
                              <FieldLabel htmlFor={item.value}>
                                {item.label}
                              </FieldLabel>
                            </li>
                          ))}
                        </ul>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div> */}
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldGroup>
            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="message">Contenido</FieldLabel>
                  <Textarea
                    {...field}
                    id="message"
                    required
                    aria-invalid={fieldState.invalid}
                    placeholder="Comentanos cual seria el proposito de la cita"
                    className="resize-none h-30"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>

        <Field orientation="horizontal" className="justify-center flex-col">
          <div>
            {status === "success" && (
              <p className="text-md text-green-700" role="status">
                Mensaje enviado correctamente, nos pondremos en contacto contigo
                pronto!
              </p>
            )}
            {status === "error" && (
              <p className="text-md text-red-700" role="alert">
                Lo sentimos. No se pudo enviar el mensaje. Intentalo de
                nuevamente.
              </p>
            )}
          </div>
          <Button
            type="submit"
            size={"lg"}
            disabled={status === "sending"}
            className="cursor-pointer w-40 h-12"
          >
            <Send className="mr-2" />
            {status === "sending" ? "Enviando" : "Enviar"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
