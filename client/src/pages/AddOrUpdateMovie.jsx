// import React, { useState, useEffect } from "react";
// import { addMovie, updateMovie, getMovieById } from "../services/movieService";
// import { useNavigate, useParams } from "react-router-dom";

// const AddOrUpdateMovie = () => {
//   const navigate = useNavigate();
//   const { movieId } = useParams();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [movie, setMovie] = useState({
//     title: "",
//     description: "",
//     writers: [""],
//     directors: [""],
//     genre: [""],
//     actors: [""],
//     trailerUrl: "",
//     photos: [""],
//     duration: "",
//     releaseDate: "",
//   });

//   useEffect(() => {
//     if (movieId) {
//       // Fetch movie data if editing
//       getMovieById(movieId)
//         .then((data) => {
//           // Ensure all array fields exist
//           const safeMovie = {
//             ...data,
//             writers: data.writers || [""],
//             directors: data.directors || [""],
//             genre: data.genre || [""],
//             actors: data.actors || [""],
//             photos: data.photos || [""],
//           };
//           setMovie(safeMovie);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, [movieId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMovie((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleArrayChange = (field, index, value) => {
//     const updatedArray = [...movie[field]];
//     updatedArray[index] = value;
//     setMovie((prev) => ({ ...prev, [field]: updatedArray }));
//   };

//   const addArrayField = (field) => {
//     setMovie((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
//   };

//   const removeArrayField = (field, index) => {
//     const updatedArray = movie[field].filter((_, i) => i !== index);
//     setMovie((prev) => ({ ...prev, [field]: updatedArray }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (movieId) {
//         await updateMovie(movieId, movie);
//       } else {
//         await addMovie(movie);
//       }
//       navigate("/movies");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const renderArrayInputs = (label, field) => (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       {movie[field].map((item, index) => (
//         <div key={index} className="flex mb-2">
//           <input
//             type="text"
//             value={item}
//             onChange={(e) => handleArrayChange(field, index, e.target.value)}
//             className="w-full px-3 py-2 border rounded-md"
//           />
//           <button
//             type="button"
//             onClick={() => removeArrayField(field, index)}
//             className="ml-2 px-2 text-white bg-red-500 rounded"
//           >
//             ➖
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() => addArrayField(field)}
//         className="mb-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//       >
//         ➕ Add {label}
//       </button>
//     </div>
//   );



//   if (loading) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
//         {movieId ? "Update Movie" : "Add Movie"}
//       </h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={movie.title}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border rounded-md"
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={movie.description}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border rounded-md"
//         />

//         {renderArrayInputs("Writers", "writers")}
//         {renderArrayInputs("Directors", "directors")}
//         {renderArrayInputs("Genres", "genre")}
//         {renderArrayInputs("Actors", "actors")}
//         {renderArrayInputs("Photos (URLs)", "photos")}

//         <input
//           type="text"
//           name="trailerUrl"
//           placeholder="Trailer URL"
//           value={movie.trailerUrl}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-md"
//         />

//         <input
//           type="number"
//           name="duration"
//           placeholder="Duration (minutes)"
//           value={movie.duration}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-md"
//         />

//         <input
//           type="date"
//           name="releaseDate"
//           value={movie.releaseDate?.substr(0, 10)}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-md"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
//         >
//           {movieId ? "Update Movie" : "Add Movie"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddOrUpdateMovie;



/***************************************final************************************/


// "use client"

// import { useState, useEffect } from "react"
// import { addMovie, updateMovie, getMovieById } from "../services/movieService"
// import { useNavigate, useParams } from "react-router-dom"

// const AddOrUpdateMovie = () => {
//   const navigate = useNavigate()
//   const { movieId } = useParams()
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(true)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const [movie, setMovie] = useState({
//     title: "",
//     description: "",
//     writers: [""],
//     directors: [""],
//     genre: [""],
//     actors: [""],
//     trailerUrl: "",
//     photos: [""],
//     duration: "",
//     releaseDate: "",
//   })

//   useEffect(() => {
//     if (movieId) {
//       // Fetch movie data if editing
//       getMovieById(movieId)
//         .then((data) => {
//           // Ensure all array fields exist
//           const safeMovie = {
//             ...data,
//             writers: data.writers || [""],
//             directors: data.directors || [""],
//             genre: data.genre || [""],
//             actors: data.actors || [""],
//             photos: data.photos || [""],
//           }
//           setMovie(safeMovie)
//           setLoading(false)
//         })
//         .catch((err) => {
//           setError(err.message)
//           setLoading(false)
//         })
//     } else {
//       setLoading(false)
//     }
//   }, [movieId])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setMovie((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleArrayChange = (field, index, value) => {
//     const updatedArray = [...movie[field]]
//     updatedArray[index] = value
//     setMovie((prev) => ({ ...prev, [field]: updatedArray }))
//   }

//   const addArrayField = (field) => {
//     setMovie((prev) => ({ ...prev, [field]: [...prev[field], ""] }))
//   }

//   const removeArrayField = (field, index) => {
//     const updatedArray = movie[field].filter((_, i) => i !== index)
//     setMovie((prev) => ({ ...prev, [field]: updatedArray }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setError("")

//     try {
//       if (movieId) {
//         await updateMovie(movieId, movie)
//       } else {
//         await addMovie(movie)
//       }
//       navigate("/movies")
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const renderArrayInputs = (label, field, icon) => (
//     <div className="space-y-3">
//       <label className="block text-sm font-medium text-gray-700 items-center">
//         {icon}
//         {label}
//       </label>
//       <div className="space-y-2">
//         {movie[field].map((item, index) => (
//           <div key={index} className="flex items-center gap-2">
//             <input
//               type="text"
//               value={item}
//               onChange={(e) => handleArrayChange(field, index, e.target.value)}
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder={`Enter ${label.toLowerCase()}`}
//             />
//             <button
//               type="button"
//               onClick={() => removeArrayField(field, index)}
//               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
//               title={`Remove ${label}`}
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                 />
//               </svg>
//             </button>
//           </div>
//         ))}
//       </div>
//       <button
//         type="button"
//         onClick={() => addArrayField(field)}
//         className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
//       >
//         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//         </svg>
//         Add {label}
//       </button>
//     </div>
//   )

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading movie data...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Back button */}
//         <div className="mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors duration-200"
//           >
//             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//             </svg>
//             Back
//           </button>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r to-blue-600 from-purple-600 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white flex items-center">
//               <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
//                 />
//               </svg>
//               {movieId ? "Update Movie" : "Add New Movie"}
//             </h2>
//             <p className="text-blue-100 text-sm mt-1">
//               {movieId ? "Edit movie details and information" : "Create a new movie entry for the cinema system"}
//             </p>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="px-6 py-3 bg-red-50 border-l-4 border-red-500 text-red-700">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path
//                     fillRule="evenodd"
//                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 {error}
//               </div>
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="p-6 space-y-6">
//             {/* Basic Information */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="lg:col-span-2">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                   <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   Basic Information
//                 </h3>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Movie Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Enter movie title"
//                   value={movie.title}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
//                 <input
//                   type="number"
//                   name="duration"
//                   placeholder="120"
//                   value={movie.duration}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div className="lg:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   name="description"
//                   placeholder="Enter movie description"
//                   value={movie.description}
//                   onChange={handleChange}
//                   required
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
//                 <input
//                   type="date"
//                   name="releaseDate"
//                   value={movie.releaseDate?.substr(0, 10)}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Trailer URL</label>
//                 <input
//                   type="url"
//                   name="trailerUrl"
//                   placeholder="https://youtube.com/watch?v=..."
//                   value={movie.trailerUrl}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Cast & Crew */}
//             <div className="border-t border-gray-200 pt-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                 <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 Cast & Crew
//               </h3>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {renderArrayInputs(
//                   "Directors",
//                   "directors",
//                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>,
//                 )}

//                 {renderArrayInputs(
//                   "Writers",
//                   "writers",
//                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                     />
//                   </svg>,
//                 )}

//                 {renderArrayInputs(
//                   "Actors",
//                   "actors",
//                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>,
//                 )}

//                 {renderArrayInputs(
//                   "Genres",
//                   "genre",
//                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h8m-8 0H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-2"
//                     />
//                   </svg>,
//                 )}
//               </div>
//             </div>

//             {/* Media */}
//             <div className="border-t border-gray-200 pt-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                 <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//                 Media & Photos
//               </h3>
//               {renderArrayInputs(
//                 "Photo URLs",
//                 "photos",
//                 <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>,
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="border-t border-gray-200 pt-6">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-gradient-to-r to-blue-600 from-purple-600 hover:to-blue-700 hover:from-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg
//                       className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     {movieId ? "Updating Movie..." : "Adding Movie..."}
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                     {movieId ? "Update Movie" : "Add Movie"}
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Help Text */}
//           <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//             <div className="flex items-center text-sm text-gray-600">
//               <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span>
//                 Fill in all required fields. You can add multiple entries for cast, crew, and photos using the add
//                 buttons.
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AddOrUpdateMovie



/****************************************** Clodinary ***************************************/

"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { addMovie, updateMovie, getMovieById } from "../services/movieService"
import { useNavigate, useParams } from "react-router-dom"

const AddOrUpdateMovie = () => {
  const navigate = useNavigate()
  const { movieId } = useParams()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    writers: [""],
    directors: [""],
    genre: [""],
    actors: [""],
    trailerUrl: "",
    photos: [""],
    duration: "",
    releaseDate: "",
  })

  useEffect(() => {
    if (movieId) {
      // Fetch movie data if editing
      getMovieById(movieId)
        .then((data) => {
          // Ensure all array fields exist
          const safeMovie = {
            ...data,
            writers: data.writers || [""],
            directors: data.directors || [""],
            genre: data.genre || [""],
            actors: data.actors || [""],
            photos: data.photos || [""],
          }
          setMovie(safeMovie)
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [movieId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setMovie((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...movie[field]]
    updatedArray[index] = value
    setMovie((prev) => ({ ...prev, [field]: updatedArray }))
  }

  const addArrayField = (field) => {
    setMovie((prev) => ({ ...prev, [field]: [...prev[field], ""] }))
  }

  const removeArrayField = (field, index) => {
    const updatedArray = movie[field].filter((_, i) => i !== index)
    setMovie((prev) => ({ ...prev, [field]: updatedArray }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    console.log(movie)

    try {
      if (movieId) {
        await updateMovie(movieId, movie)
      } else {
        await addMovie(movie)
      }
      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderArrayInputs = (label, field, icon) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 items-center">
        {icon}
        {label}
      </label>
      <div className="space-y-2">
        {movie[field].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
            <button
              type="button"
              onClick={() => removeArrayField(field, index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title={`Remove ${label}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => addArrayField(field)}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add {label}
      </button>
    </div>
  )

  const renderPhotoInputs = (photoUrls, setPhotoUrls) => {
    const handlePhotoChange = async (index, file) => {
      if (!file) return
      try {
        const formData = new FormData()
        formData.append("photo", file)

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/upload`, formData)
        const url = response.data.imageUrl

        const updatedPhotos = [...photoUrls]
        updatedPhotos[index] = url
        setPhotoUrls(updatedPhotos)
      } catch (error) {
        console.error("Upload failed", error)
        setError("Upload Failed")
      }
    }

    const handleAddPhoto = () => setPhotoUrls([...photoUrls, ""])

    const handleRemovePhoto = (index) => {
      const updatedPhotos = [...photoUrls]
      updatedPhotos.splice(index, 1)
      setPhotoUrls(updatedPhotos)
    }

    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 items-center">
          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Photos
        </label>
        <div className="space-y-4">
          {photoUrls.map((url, index) => (
            <div key={index} className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              {/* Mobile: Stack vertically, Desktop: Side by side */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                {/* URL Input - Full width on mobile, flex-1 on desktop */}
                <div className="flex-1 space-y-2">
                  <label className="block text-xs font-medium text-gray-600 sm:hidden">Image URL</label>
                  <input
                    type="text"
                    value={url}
                    readOnly
                    placeholder="Uploaded image URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* File Input and Remove Button Container */}
                <div className="flex flex-col sm:flex-row gap-2 sm:items-start">
                  {/* File Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-600 sm:hidden">Choose File</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoChange(index, e.target.files[0])}
                      className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-600 
                             hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 
                           sm:mt-0 self-start"
                    title="Remove Photo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span className="ml-1 text-sm sm:hidden">Remove</span>
                  </button>
                </div>
              </div>

              {/* Image Preview - Responsive sizing */}
              {url && (
                <div className="flex justify-center sm:justify-start">
                  <div className="relative">
                    <img
                      src={url || "/placeholder.svg"}
                      alt="Preview"
                      className="w-32 h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                    {/* Optional: Add a loading state or error handling */}
                    <div
                      className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse hidden"
                      id={`loading-${index}`}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Photo Button - Responsive */}
        <button
          type="button"
          onClick={handleAddPhoto}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Photo
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r to-blue-600 from-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {movieId ? "Update Movie" : "Add New Movie"}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {movieId ? "Edit movie details and information" : "Create a new movie entry for the cinema system"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-6 py-3 bg-red-50 border-l-4 border-red-500 text-red-700">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Basic Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Movie Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter movie title"
                  value={movie.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  placeholder="120"
                  value={movie.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter movie description"
                  value={movie.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
                <input
                  type="date"
                  name="releaseDate"
                  value={movie.releaseDate?.substr(0, 10)}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trailer URL</label>
                <input
                  type="url"
                  name="trailerUrl"
                  placeholder="https://youtube.com/watch?v=..."
                  value={movie.trailerUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Cast & Crew */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Cast & Crew
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {renderArrayInputs(
                  "Directors",
                  "directors",
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>,
                )}

                {renderArrayInputs(
                  "Writers",
                  "writers",
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>,
                )}

                {renderArrayInputs(
                  "Actors",
                  "actors",
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>,
                )}

                {renderArrayInputs(
                  "Genres",
                  "genre",
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h8m-8 0H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-2"
                    />
                  </svg>,
                )}
              </div>
            </div>

            {/* Media */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Media & Photos
              </h3>
              {renderPhotoInputs(movie.photos, (val) => setMovie({ ...movie, photos: val }))}
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r to-blue-600 from-purple-600 hover:to-blue-700 hover:from-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {movieId ? "Updating Movie..." : "Adding Movie..."}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {movieId ? "Update Movie" : "Add Movie"}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Fill in all required fields. You can add multiple entries for cast, crew, and photos using the add
                buttons.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddOrUpdateMovie
