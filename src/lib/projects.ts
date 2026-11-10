export type Project = {
  name: string;
  category: string;
  result: string;
  /** Real looping background video for the project card. */
  video: string;
  poster: string;
  /** Live website link. Leave empty ("") until the site is live: the button shows "Coming soon". */
  liveUrl: string;
};

const mixkit = (id: number) => ({
  video: `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  poster: `https://assets.mixkit.co/videos/${id}/${id}-thumb-720-0.jpg`,
});

/** Edit the liveUrl of each project to link its real website. */
export const PROJECTS: Project[] = [
  {
    name: "Spice Route Restaurant",
    category: "Restaurant",
    result: "Online menu, table booking and WhatsApp orders",
    ...mixkit(39535),
    liveUrl: "",
  },
  {
    name: "Glow Studio",
    category: "Booking System",
    result: "+40% more bookings",
    ...mixkit(40126),
    liveUrl: "",
  },
  {
    name: "FitZone Gym",
    category: "Landing Page",
    result: "A stronger first impression",
    ...mixkit(44411),
    liveUrl: "",
  },
  {
    name: "UrbanKart",
    category: "E-commerce",
    result: "A smoother way to shop",
    ...mixkit(42121),
    liveUrl: "",
  },
];
