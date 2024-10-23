

const Services = () => {
  const routerLocation = useLocation();
  const searchParams = new URLSearchParams(routerLocation.search);
  const [color, setColor] = useState(searchParams.get('color') || '');
  const locationX = searchParams.get('location');
  const [data, setData] = useState<TVehicleResponse[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [location, setLocation] = useState<string>(locationX ? locationX : '');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);



  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = (e.target as HTMLFormElement).search.value;
    setSearchTerm(value);
}

const fetchProducts = async (): Promise<void> => {
    try {
        const response = await axios.get('https://car-rental-reservation-system-nine.vercel.app/api/cars', {
            params: {
                searchTerm,
                location,
                color,
                minPrice,
                maxPrice,
                sortOrder,
            },
        });
        setData(response.data.data);
        setIsLoading(false)
    } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
    }
};

  return (
    <div>Services</div>
  )
}

export default Services