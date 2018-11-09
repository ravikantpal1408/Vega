using System;
using System.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;


namespace vega.Models
{
    public class VegaDbContext : DbContext
    {

        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }

        public VegaDbContext(DbContextOptions<VegaDbContext> options)
        : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<VehicleFeature>()
            .HasKey(vf => new { vf.VehicleId, vf.FeatureId });
        }
    }
}