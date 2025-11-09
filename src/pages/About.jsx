import Logo from "/MyLogo.webp"; // pastikan path sesuai

const About = () => {
  const members = [
    "Arga",
    "Dimas",
    "Afandi",
    "Harun",
    "Chelsea",
    "Yasmin",
    "Fredy",
    "Ludi",
    "Endah",
    "Ilmi",
    "Aini",
    "Thiflah",
    "Ivan",
    "Agung",
    "P.Adie",
    "P.Wahyu",
    "P.Rizky",
    "P.Azka",
  ];

  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
          Tentang Memory Wall
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed sm:leading-loose text-justify sm:text-center">
          <span className="block mb-4">
            Memory Wall dibuat sebagai tempat sederhana untuk menyimpan kenangan
            selama masa kebersamaan kita di pelatihan PBL BPVP Sidoarjo, mulai
            dari foto, cerita, hingga momen-momen kecil yang pernah kita lewati
            bersama.
          </span>

          <span className="block mb-4">
            Di sini, setiap gambar punya cerita, setiap senyum punya makna, dan
            setiap kenangan akan selalu hidup meski waktu terus berjalan.
          </span>

          <span className="block mb-4">
            Pertemuan kita memang singkat, dan setelah ini kita akan kembali
            sibuk dengan jalan dan urusan masing-masing.
          </span>

          <span className="block mb-4">
            Tapi lewat Memory Wall ini, semoga setiap kenangan yang pernah
            tercipta bisa tetap hangat diingat, menjadi pengingat bahwa di balik
            perjalanan kita yang berbeda, pernah ada kebersamaan yang indah dan
            tulus.
          </span>
        </p>

        {/* Member list */}
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Thanks to:</h2>
          <ul className="list-none text-gray-200 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
            {members.map((member, index) => (
              <li key={index} className="text-sm md:text-base text-center">
                {member}
              </li>
            ))}
          </ul>
        </div>

        {/* Logo di paling bawah */}
        <div className="mt-10 flex justify-center">
          <img src={Logo} alt="Logo" className="h-24 sm:h-32 object-contain" />
        </div>
      </section>
    </main>
  );
};

export default About;
