"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useId, useState } from "react";
import { z } from "zod";
import { ArrowUpRight, Info, LoaderCircle } from "lucide-react";
import PageLink from "@/components/PageLink";
import styles from "./ContactForm.module.css";

const formSchema = z.object({
  name: z.string().trim().min(1, "Escribe tu nombre.").max(32, "Usa un máximo de 32 caracteres."),
  phone: z.string(),
  email: z.email("Escribe un correo electrónico válido.").max(100, "Usa un máximo de 100 caracteres."),
  message: z.string().trim().min(10, "Escribe al menos 10 caracteres para que podamos ayudarte.").max(500, "Usa un máximo de 500 caracteres."),
});
type ContactData = z.infer<typeof formSchema>;

export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactData>({
    resolver: zodResolver(formSchema), mode: "onBlur", reValidateMode: "onChange",
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  async function onSubmit(data: ContactData) {
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("No se ha podido enviar la solicitud.");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form} aria-labelledby={id + "-title"} aria-busy={status === "sending"}>
      <h3 id={id + "-title"}>Cuéntanos cómo podemos ayudarte.</h3>
      <p className={styles.intro}>Para pedir cita o resolver dudas de organización. Los campos marcados con * son obligatorios.</p>
      <div className={styles.notice} id={id + "-notice"}><Info size={19} aria-hidden="true" /><p>No incluyas información médica, radiografías ni documentos personales. Este formulario no atiende urgencias.</p></div>
      <div className={styles.row}>
        <div className={styles.field}><label htmlFor={id + "-name"}>Nombre *</label><input {...register("name")} id={id + "-name"} required autoComplete="given-name" maxLength={32} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? id + "-name-error" : undefined} />{errors.name ? <p id={id + "-name-error"} className={styles.error}>{errors.name.message}</p> : null}</div>
        <div className={styles.field}><label htmlFor={id + "-phone"}>Teléfono <span>(opcional)</span></label><input {...register("phone")} id={id + "-phone"} type="tel" autoComplete="tel" inputMode="tel" maxLength={30} /></div>
      </div>
      <div className={styles.field}><label htmlFor={id + "-email"}>Correo electrónico *</label><input {...register("email")} id={id + "-email"} required type="email" autoComplete="email" maxLength={100} placeholder="tu@correo.es" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? id + "-email-error" : undefined} />{errors.email ? <p id={id + "-email-error"} className={styles.error}>{errors.email.message}</p> : null}</div>
      <div className={styles.field}><label htmlFor={id + "-message"}>Tu mensaje *</label><textarea {...register("message")} id={id + "-message"} required rows={4} maxLength={500} placeholder="Por ejemplo: me gustaría consultar la disponibilidad para una primera visita." aria-invalid={Boolean(errors.message)} aria-describedby={id + "-notice" + (errors.message ? " " + id + "-message-error" : "")} />{errors.message ? <p id={id + "-message-error"} className={styles.error}>{errors.message.message}</p> : null}</div>
      <PageLink href="/terminos/politica-privacidad" className={styles.privacy}>Política de privacidad</PageLink>
      <div className={styles.status} aria-live="polite">{status === "success" ? <p>Hemos recibido tu mensaje. Contactaremos contigo para responder a tu consulta. El envío no confirma una cita.</p> : null}{status === "error" ? <p role="alert" className={styles.error}>No se ha podido enviar el mensaje. Inténtalo de nuevo o llama a la clínica.</p> : null}</div>
      <button type="submit" disabled={status === "sending"} className={styles.submit}>{status === "sending" ? <>Enviando… <LoaderCircle size={18} className={styles.spinner} aria-hidden="true" /></> : <>Enviar mi consulta <ArrowUpRight size={18} aria-hidden="true" /></>}</button>
    </form>
  );
}
