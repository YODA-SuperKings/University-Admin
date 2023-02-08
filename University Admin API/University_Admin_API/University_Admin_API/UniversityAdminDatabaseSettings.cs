using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace University_Admin_API
{
    public class UniversityAdminDatabaseSettings : IUniversityAdminDatabaseSettings
    {
        public string CollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
    public interface IUniversityAdminDatabaseSettings
    {
        string CollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
