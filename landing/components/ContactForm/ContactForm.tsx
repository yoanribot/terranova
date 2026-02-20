import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
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

export function ContactForm() {
  return (
    <div className="w-full my-10 py-10">
      <form className="w-full  bg-white max-w-3xl m-auto shadow-md px-20 py-10 rounded-lg">
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
              <div className="flex gap-3">
                <Field>
                  <FieldLabel htmlFor="name">Nombre</FieldLabel>
                  <Input id="name" required />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastname">Apellidos</FieldLabel>
                  <Input id="lastname" required />
                </Field>
              </div>

              {/* Phone and Email */}
              <div className="flex gap-3">
                <Field>
                  <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                  <Input id="phone" placeholder="+33 5678 9012 3456" required />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    placeholder="example@example.com"
                    required
                    type="email"
                  />
                </Field>
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
                  <p> Dia </p>
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
              <Field>
                <FieldLabel htmlFor="message">Contenido</FieldLabel>
                <Textarea
                  id="message"
                  placeholder="Comentanos cual seria el proposito de la cita"
                  className="resize-none h-50"
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit">Enviar</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
