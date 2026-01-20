import React from 'react';
import Card from '../../../shared/components/Card';
import Button from '../../../shared/components/Button';

const BlogSection = ({ data }) => {
    if (!data) return null;

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{data.title}</h2>
                        <p className="text-gray-600">{data.subtitle}</p>
                    </div>
                    <Button variant="ghost" className="hidden md:flex">View All Posts</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.posts.map((b, i) => (
                        <Card key={i} className="p-0 overflow-hidden group cursor-pointer h-full">
                            <div className="h-48 bg-gray-300 relative group-hover:scale-105 transition-transform duration-500">
                                {b.img ? (
                                    <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                        Blog Image
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{b.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-orange-500 transition">{b.title}</h3>
                                <p className="text-sm text-gray-500">{b.date}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
