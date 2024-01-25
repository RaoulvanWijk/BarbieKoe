import '/resources/styles/components/layout/top-nav.scss'
import Profile from './Profile'
import Modal from "@/components/Layout/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bookingSchema, TBookingSchema } from "@/lib/types/zodSchemes";

export default function TopNav() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBookingSchema>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: TBookingSchema) => {
    console.log(data);

    fetch(`/api/booking/create`, {
      method: "POST",
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
  };
  return (
    <nav className='top-nav'>
      <Modal mid={"create"} title="Update reservering" buttonProps={{ text: "Maak een nieuwe reservering", color: "orange" }}>
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


            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-200 mt-4" type="submit">
              Plaats reservering
            </button>
          </form>
        </Modal>

      <Profile />
    </nav>
  )
}
