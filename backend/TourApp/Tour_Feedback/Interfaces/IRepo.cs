namespace Tour_Feedback.Interfaces
{
    public interface IRepo<K, T>
    {
        public Task<T?> Add(T item);
        public Task<T?> Get(K key);
        public Task<ICollection<T>?> GetAll();
    }
}
