"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import clsx from "clsx";

import React from "react";
import { formatCurrency } from "@/utils/format";
import { Button } from "../ui/button";
import { updateOrderShipping } from "@/utils/actions";
import { FaStore, FaTruck, FaTruckPickup } from "react-icons/fa";

const SHIPPING_OPTIONS = {
  west: 3000,
  east: 6000,
  north: 7000,
  south: 5000,
};

const deliveryOptions = [
  {
    value: "ship",
    label: "Ship",
    icon: FaTruck,
    description: "Delivered to your address",
  },
  {
    value: "instore",
    label: "In-store Pickup",
    icon: FaStore,
    description: "Pick up from store",
  },
];

function CheckoutUI({
  cart,
  cartId,
  orderId,
}: {
  cart: any;
  cartId: string;
  orderId: string;
}) {
  const [deliveryType, setDeliveryType] = useState<"ship" | "instore">("ship");
  const [shippingMethod, setShippingMethod] =
    useState<keyof typeof SHIPPING_OPTIONS>("west");
  const [contactInfo, setContactInfo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [stateName, setStateName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing payment...");

  const shippingCost =
    deliveryType === "ship" ? SHIPPING_OPTIONS[shippingMethod] : 0;

  const total = cart.cartTotal + cart.tax + shippingCost;

  const handleSubmitAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
    if (!orderId || !cartId) {
      return alert("Missing order or cart info");
    }

    setLoading(true);

    try {
      const result = await updateOrderShipping(orderId, {
        firstName,
        lastName,
        phone,
        state: stateName,
        address,
        deliveryType,
        shippingMethod,
      });

      if (!result.success) {
        alert(result.error || "Could not update shipping info.");
        return;
      }

      const res = await fetch("/api/payment/paystack-init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, cartId }),
      });

      if (!res.ok) {
        alert("Failed to prepare payment session");
        return;
      }

      const paymentData = await res.json();

      const { default: PaystackPop } = await import("@paystack/inline-js");
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email: paymentData.email,
        amount: paymentData.amount * 100,
        reference: paymentData.reference,
        currency: "NGN",
        onSuccess: async (transaction: any) => {
          try {
            setLoading(true);
            setLoadingMessage("Payment successful. Redirecting...");
            const confirmRes = await fetch(
              `/api/confirm/paystack-confirm?reference=${transaction.reference}`
            );
            if (confirmRes.ok) {
              setTimeout(() => {
                window.location.href = `/orders/success?orderId=${orderId}`;
              }, 1500); // ✅ Go to success page
            } else {
              alert("Payment confirmed but final validation failed.");
              setLoading(false);
            }
          } catch (err) {
            alert("Something went wrong during confirmation.");
          }
        },
        onCancel: () => {
          alert("Payment cancelled.");
          setLoading(false);
        },
      });
    } catch (error) {
      alert("An error occurred. Please try again.");
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false); // Ensures button re-enables on cancel/failure
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg
          className="animate-spin h-6 w-6 text-blue-600 mb-3"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
          />
        </svg>
        <p className="text-sm text-muted-foreground">{loadingMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 p-6">
      {/* LEFT:FORM */}

      <form onSubmit={handleSubmitAndPay} className="space-y-6">
        <h2 className="text-xl font-semibold">Delivery Details</h2>
        <div>
          <Label>Contact Info</Label>
          <Input
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>
        <div>
          <RadioGroup
            value={deliveryType}
            onValueChange={(value) =>
              setDeliveryType(value as "ship" | "instore")
            }
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {deliveryOptions.map((option) => {
              const Icon = option.icon;
              const selected = deliveryType === option.value;

              return (
                <Label
                  key={option.value}
                  htmlFor={option.value}
                  className={clsx(
                    "cursor-pointer border rounded-xl p-4 flex gap-3 items-start transition",
                    selected
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                      : "border-gray-300 hover:border-blue-400"
                  )}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <span className="font-medium flex items-center gap-2">
                      <Icon className="w-4 h-4 text-blue-600" />
                      {option.label}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </Label>
              );
            })}
          </RadioGroup>
        </div>

        {deliveryType === "ship" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>State</Label>
              <Input
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Shipping Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Shipping Region</Label>
              <RadioGroup
                value={shippingMethod}
                onValueChange={(value) =>
                  setShippingMethod(value as keyof typeof SHIPPING_OPTIONS)
                }
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {Object.entries(SHIPPING_OPTIONS).map(([key, price]) => {
                  const selected = shippingMethod === key;

                  return (
                    <Label
                      key={key}
                      htmlFor={key}
                      className={clsx(
                        "cursor-pointer border rounded-xl p-4 flex flex-col items-start gap-2 transition",
                        selected
                          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                          : "border-gray-300 hover:border-blue-400"
                      )}
                    >
                      <RadioGroupItem
                        value={key}
                        id={key}
                        className="self-start mt-1"
                      />
                      <div>
                        <p className="font-semibold capitalize flex items-center gap-2">
                          <FaTruckPickup className="w-4 h-4 text-blue-600" />
                          {key}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(price)}
                        </p>
                      </div>
                    </Label>
                  );
                })}
              </RadioGroup>
            </div>
          </>
        )}

        <div className="mt-6 space-y-1">
          <p>
            <strong>Shipping Cost:</strong> {formatCurrency(shippingCost)}
          </p>
          <p>
            <strong>Total:</strong> {formatCurrency(total)}
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Items</h2>
        <div className="space-y-4">
          {cart.cartItems.map((item: any) => (
            <div key={item.id} className="flex gap-4 items-start border-b pb-4">
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={64}
                height={64}
                className="rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Qty: {item.amount} × {formatCurrency(item.product.price)}
                </p>
                <p className="font-semibold">
                  {formatCurrency(item.amount * item.product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(cart.cartTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatCurrency(shippingCost)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{formatCurrency(cart.tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutUI;
