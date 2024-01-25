import PageLayout from "@/components/Layout/PageLayout"
import { useData } from "@/lib/hooks/fetch";
import { useParams } from "react-router-dom"
import { ReservationFetch } from "@/lib/types/database";

import LageItem from "@/components/Reservation/LageItem";
import Modal from "@/components/Layout/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bookingSchema, TBookingSchema } from "@/lib/types/zodSchemes";
import { useEffect } from "react";
export default function Reservation() {
  const id = useParams<{ id: string }>().id
  const reservation = useData<ReservationFetch[]>(`/api/booking/find/${id}`)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TBookingSchema>({
    resolver: zodResolver(bookingSchema),
  });
  useEffect(() => {
    // set the form values to the reservation values
    setValue("first_name", reservation?.[0].first_name ?? null)
    setValue("last_name", reservation?.[0].last_name ?? null)
    setValue("email", reservation?.[0].email ?? null)

    setValue("phone", reservation?.[0].phone ?? null)
    setValue("arrival", reservation?.[0].arrival ? new Date(reservation?.[0].arrival) : new Date())
    setValue("departure", reservation?.[0].departure ? new Date(reservation?.[0].departure) : new Date())
    setValue("young_child", reservation?.[0].young_child ?? 0)
    setValue("child", reservation?.[0].child ?? 0)
    setValue("adult", reservation?.[0].adult ?? 0)
    setValue("notes", reservation?.[0].notes ?? null)
    setValue("streetname", reservation?.[0].streetname ?? null)
    setValue("house_number", reservation?.[0].house_number.toString() ?? null)
    setValue("city", reservation?.[0].city ?? null)
    setValue("zipcode", reservation?.[0].zipcode ?? null)
    setValue("country", reservation?.[0].country ?? "")
    setValue("license_plate", reservation?.[0].license_plate ?? null)
    setValue("camping_spot_id", reservation?.[0].camping_spot_id ?? 0)
  }, [reservation])

  const onSubmit = async (data: TBookingSchema) => {
    console.log(data);

    fetch(`/api/booking/update-info/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        arrival: data.arrival,
        departure: data.departure,
        young_child: data.young_child,
        child: data.child,
        adult: data.adult,
        notes: data.notes,
        streetname: data.streetname,
        house_number: data.house_number,
        city: data.city,
        zipcode: data.zipcode,
        country: data.country,
        license_plate: data.license_plate,
        camping_spot_id: data.camping_spot_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      window.location.href = "/reservations"
    })
  }
  return (
    <PageLayout pageTitle={`Reservering van ${reservation?.[0].first_name} ${reservation?.[0].last_name}`}>
      <LageItem reservation={reservation?.[0]} />

      <div className="flex justify-between">
        <Modal mid={"update"} title="Update reservering" buttonProps={{ text: "Update de reservering", color: "blue" }}>
          <form onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-3 gap-4">
            {/* Create form for TBookingSchema properties */}
            <div className="flex flex-col">
              <label htmlFor="first_name">Voornaam</label>
              <input type="text" {...register("first_name")} />
              {errors.first_name && <p>{errors.first_name.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="last_name">Achternaam</label>
              <input type="text" {...register("last_name")} />
              {errors.last_name && <p>{errors.last_name.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input type="email" {...register("email")} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Telefoonnummer</label>
              <input type="tel" {...register("phone")} />
              {errors.phone && <p>{errors.phone.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="arrival">Aankomst datum</label>
              <input type="datetime-local" {...register("arrival")} />
              {errors.arrival && <p>{errors.arrival.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="departure">Vertek datum</label>
              <input type="datetime-local" {...register("departure")} />
              {errors.departure && <p>{errors.departure.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="amount_of_people">Aantal Jonge kindere</label>
              <input type="number" {...register("young_child")} />
              {errors.young_child && <p>{errors.young_child.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="child">Aantal kindere</label>
              <input type="number" {...register("child")} />
              {errors.child && <p>{errors.child.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="adult">Aantal Jonge kindere</label>
              <input type="number" {...register("adult")} />
              {errors.adult && <p>{errors.adult.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="notes">Notities</label>
              <input type="text" {...register("notes")} />
              {errors.notes && <p>{errors.notes.message}</p>}
            </div>
            {/* Adres */}
            <div className="flex flex-col">
              <label htmlFor="streetname">Straat</label>
              <input type="text" {...register("streetname")} />
              {errors.streetname && <p>{errors.streetname.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="house_number">Huisnummer</label>
              <input type="text" {...register("house_number")} />
              {errors.house_number && <p>{errors.house_number.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="city">Stad</label>
              <input type="text" {...register("city")} />
              {errors.city && <p>{errors.city.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="zipcode">Postcode</label>
              <input type="text" {...register("zipcode")} />
              {errors.zipcode && <p>{errors.zipcode.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="country">Land</label>
              <input type="text" {...register("country")} />
              {errors.country && <p>{errors.country.message}</p>}
            </div>

            {/* license plate00 */}

            <div className="flex flex-col">
              <label htmlFor="license_plate">Kenteken</label>
              <input type="text" {...register("license_plate")} />
              {errors.license_plate && <p>{errors.license_plate.message}</p>}
            </div>
            {/* camping plaats */}
            <div className="flex flex-col">
              <label htmlFor="camping_spot_id">Camping plaats</label>
              <input type="number" {...register("camping_spot_id")} />
              {errors.camping_spot_id && <p>{errors.camping_spot_id.message}</p>}

            </div>


            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 mt-4" type="submit">
              Update
            </button>
          </form>
        </Modal>
        <Modal mid={"delete"} title="Weet u zeker dat u deze reservering wilt annuleren?" buttonProps={{ text: "Annuleer de reserveringen", color: "red" }}>
          <button className="
          bg-red-500
          hover:bg-red-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          transition
          duration-200

          mt-4
          " onClick={
              () => {
                fetch(`/api/booking/delete/${id}`, {
                  method: "DELETE"
                }).then(() => {
                  window.location.href = "/reservations"
                })
              }
            } type="button">
            Annuleer de reservering
          </button>
        </Modal>
      </div>
    </PageLayout>

  )
}
