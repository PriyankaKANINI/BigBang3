namespace Tour_Images.Interfaces
{
    public interface IRepo <K,T>
    {
        public Task<T?> Add(T item);
        public Task<ICollection<T>?> GetAll();
        public Task<T?> Get(int id);
    }
}
