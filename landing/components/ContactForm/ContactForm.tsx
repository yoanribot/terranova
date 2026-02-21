"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
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
  phone: z
    .string()
    .nonempty("El teléfono es obligatorio.")
    .min(7, "El teléfono debe tener al menos 7 caracteres."),
  email: z
    .string()
    .email("El correo electrónico no es válido.")
    .max(100, "El correo electrónico debe tener como máximo 100 caracteres."),
  message: z
    .string()
    .nonempty("El mensaje es obligatorio.")
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(500, "El mensaje debe tener como máximo 500 caracteres."),
});

export function ContactForm() {
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
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form data:", data);
  }

  return (
    <div id="contact" className="w-full my-10 py-10">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="w-full  bg-white max-w-3xl m-auto shadow-md px-5 md:px-20 py-10 md:rounded-lg"
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>
              <h4 className="text-2xl">Formulario de contacto</h4>
            </FieldLegend>
            <FieldDescription>
              Escribenos un mensaje y nos pondremos en contacto contigo lo antes
              posible.
            </FieldDescription>

            <FieldGroup>
              {/* Name and Lastname */}
              <div className="md:flex gap-3">
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
                  name="lastname"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="lastname">Apellidos</FieldLabel>

                      <Input
                        {...field}
                        id="lastname"
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
              </div>

              {/* Phone and Email */}
              <div className="md:flex gap-3">
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="mb-6">
                      <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                      <Input
                        {...field}
                        id="phone"
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
              <div className="flex gap-3">
                <FieldGroup className="flex-1">
                  <p> Horarios </p>
                  <Field orientation="horizontal">
                    <ul>
                      {time.map((item) => (
                        <li key={item.value} className="flex gap-2 mb-1">
                          <Checkbox
                            id={item.value}
                            name="time"
                            className="self-center"
                          />
                          <FieldLabel htmlFor={item.value}>
                            {item.label}
                          </FieldLabel>
                        </li>
                      ))}
                    </ul>
                  </Field>
                </FieldGroup>

                <FieldGroup className="flex-1">
                  <p> Dias </p>
                  <Field orientation="horizontal">
                    <ul>
                      {days.map((item) => (
                        <li key={item.value} className="flex gap-2 mb-1">
                          <Checkbox
                            id={item.value}
                            name="day"
                            className="self-center"
                          />
                          <FieldLabel htmlFor={item.value}>
                            {item.label}
                          </FieldLabel>
                        </li>
                      ))}
                    </ul>
                  </Field>
                </FieldGroup>
              </div>
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
                      className="resize-none h-50"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit">
              <Send className="mr-2" />
              Enviar
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
