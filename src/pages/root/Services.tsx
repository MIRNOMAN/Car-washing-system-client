

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

  return (
    <div>Services</div>
  )
}

export default Services