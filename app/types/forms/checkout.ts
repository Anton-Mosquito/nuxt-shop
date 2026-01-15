/**
 * Checkout form data
 */
export interface CheckoutFormData {
  // Personal info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Delivery address
  city: string;
  address: string;
  zipCode: string;

  // Payment & delivery
  deliveryMethod: "nova-poshta" | "ukrposhta" | "courier";
  paymentMethod: "card" | "cash" | "online";

  // Additional
  comment?: string;
  subscribe?: boolean;
}
