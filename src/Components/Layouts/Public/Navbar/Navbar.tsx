// import './navbar.scss';
// import { ChangeEvent, useEffect, useRef, useState } from 'react';
// import { ICONS } from '../../../../Shared/icons';
// import DropdownMenu from './Dropdown';

// export function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
//   const [searchText, setSearchText] = useState<string>('');
//   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleSearchText = (e: ChangeEvent<HTMLInputElement>): void => {
//     setSearchText(e.target.value);
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       dropdownRef.current &&
//       !dropdownRef.current.contains(event.target as Node)
//     ) {
//       setDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (dropdownOpen) {
//       document.addEventListener('mousedown', handleClickOutside, {
//         passive: true,
//       });
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownOpen]);

//   return (
//     <nav className="sticky top-0 bg-white dark:bg-my-bg-dark shadow-lg px-4 py-1 flex justify-between items-center z-50">
//       <div className="flex items-center space-x-6">
//         <div className="flex items-center space-x-4">
//           <img
//             className="cursor-pointer w-10 hover:bg-my-hover hover:dark:bg-my-hover-dark p-2 rounded-full"
//             src={ICONS.Menu}
//             alt="Menu"
//             onClick={toggleSidebar}
//           />
//           <div className="flex items-center space-x-1">
//             <img src={ICONS.Logo} alt="Logo" className="h-14 w-14" />
//             <span className="font-semibold text-gray-700 dark:text-white">
//               Note Taking App
//             </span>
//           </div>
//         </div>
//       </div>

//       <form className="flex items-center bg-my-background dark:bg-my-bg-dark dark:border-my-icon-dark dark:border px-2 py-1 rounded-lg shadow-inner min-w-32 md:min-w-96 ml-4">
//         <button
//           className="hover:bg-my-hover hover:dark:bg-my-hover-dark p-2 mr-2 rounded-full"
//           type="button"
//         >
//           <img src={ICONS.Search} alt="Search" />
//         </button>
//         <input
//           value={searchText}
//           type="text"
//           autoComplete="off"
//           placeholder="Search"
//           onChange={handleSearchText}
//           className="bg-transparent border-none outline-none w-full text-gray-700 dark:text-white placeholder-gray-500"
//         />
//         {searchText && (
//           <button
//             className="hover:bg-my-hover hover:dark:bg-my-hover-dark p-2 rounded-full"
//             type="button"
//             onClick={() => setSearchText('')}
//           >
//             <img src={ICONS.Close} alt="Close" />
//           </button>
//         )}
//       </form>

//       <div className="flex items-center space-x-8 relative">
//         {/* <img
//           className="cursor-pointer w-10 hover:bg-my-hover p-2 rounded-full"
//           src={ICONS.Settings}
//           alt="Settings"
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//         /> */}
//         {/* {dropdownOpen && <DropdownMenu />} */}

//         <img
//           className="w-8 h-8 rounded-full shadow-md ml-4 mr-2"
//           src={ICONS.Books}
//           alt="Account"
//           onClick={() => setDropdownOpen((dropdownOpen)=>!dropdownOpen)}
//         />
//         {dropdownOpen && (
//           <DropdownMenu
//             ref={dropdownRef}
//             closeMenu={() => setDropdownOpen(false)}
//           />
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import './navbar.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ICONS } from '../../../../Shared/icons';
import DropdownMenu from './Dropdown';
import filter from 'lodash.filter';
import { Note } from '../../../../Views/Notes/Notes';

export function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [searchText, setSearchText] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value;
    setSearchText(query);
    const formattedQuery = query.toLowerCase();
    const result = filter(notes, note => contains(note, formattedQuery));
    setFilteredNotes(result);
  };

  const contains = ({ title, desc }: Note, query: string) => {
    return (
      title.toLowerCase().includes(query) || desc.toLowerCase().includes(query)
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside, {
        passive: true,
      });
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="sticky top-0 bg-white dark:bg-my-bg-dark shadow-lg px-4 py-1 flex justify-between items-center z-50">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <img
            className="cursor-pointer w-10 hover:bg-my-hover hover:dark:bg-my-hover-dark p-2 rounded-full"
            src={ICONS.Menu}
            alt="Menu"
            onClick={toggleSidebar}
          />
          <div className="flex items-center space-x-1">
            <img src={ICONS.Logo} alt="Logo" className="h-14 w-14" />
            <span className="font-semibold text-gray-700 dark:text-white">
              Note Taking App
            </span>
          </div>
        </div>
      </div>

      <form className="flex items-center bg-my-background dark:bg-my-bg-dark dark:border-my-icon-dark dark:border px-2 py-1 rounded-lg shadow-inner min-w-32 md:min-w-96 ml-4">
        <button
          className="hover:bg-my-hover hover:dark:bg-my-hover-dark p-2 mr-2 rounded-full"
          type="button"
        >
          <img src={ICONS.Search} alt="Search" />
        </button>
        <input
          value={searchText}
          type="text"
          autoComplete="off"
          placeholder="Search"
          onChange={handleSearchText}
          className="bg-transparent border-none outline-none w-full text-gray-700 dark:text-white placeholder-gray-500"
        />
        {searchText && (
          <button
            className="hover:bg-my-hover hover:dark:bg-my-hover-dark p-2 rounded-full"
            type="button"
            onClick={() => setSearchText('')}
          >
            <img src={ICONS.Close} alt="Close" />
          </button>
        )}
      </form>

      <div className="flex items-center space-x-8 relative">
        <img
          className="w-8 h-8 rounded-full shadow-md ml-4 mr-2"
          src={ICONS.Books}
          alt="Account"
          onClick={() => setDropdownOpen((dropdownOpen) => !dropdownOpen)}
        />
        {dropdownOpen && (
          <DropdownMenu
            ref={dropdownRef}
            closeMenu={() => setDropdownOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
