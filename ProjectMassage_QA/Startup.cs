using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ProjectMassage_QA.Startup))]
namespace ProjectMassage_QA
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
