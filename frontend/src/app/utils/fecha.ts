export function fechaLocal(d: Date = new Date()): string {
  const anio = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

export function sumarDias(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}