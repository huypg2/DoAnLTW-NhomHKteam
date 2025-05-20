using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ShopQuanAo.Models;

namespace ShopQuanAo.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult ProductsPage()
    {
        return View();
    }

    public IActionResult Cart()
    {
        return View();
    }
    public IActionResult ProductDetail(int id)
{
    // Ví dụ: Lấy sản phẩm từ danh sách hoặc database
    var products = new List<Product>
    {
        new Product { Id = 1, Name = "Áo Polo thể thao can vai cao cấp", ImageUrl = "https://via.placeholder.com/300x400?text=Áo+Polo", Price = 299000, Description = "Mô tả sản phẩm 1" },
        new Product { Id = 2, Name = "Áo Polo can phối chất liệu Coolmax", ImageUrl = "https://via.placeholder.com/300x400?text=Áo+Phối", Price = 399000, Description = "Mô tả sản phẩm 2" },
        // ... các sản phẩm khác ...
    };
    var product = products.FirstOrDefault(p => p.Id == id);
    if (product == null) return NotFound();
    return View(product);
}

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
