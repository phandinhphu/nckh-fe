import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-card border-t border-border mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* University Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <GraduationCap className="h-6 w-6 text-primary" />
                            <h3 className="text-lg font-semibold text-foreground">Trường Đại học Quy Nhơn</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Hệ thống lập kế hoạch học tập hiện đại, giúp sinh viên quản lý và theo dõi tiến độ học tập
                            một cách hiệu quả.
                        </p>
                        <div className="flex space-x-4">
                            <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Đăng ký môn học
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Xem điểm số
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Lịch thi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Học phí
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Hỗ trợ</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Hướng dẫn sử dụng
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Câu hỏi thường gặp
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Liên hệ IT
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Báo lỗi hệ thống
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Liên hệ</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">170 An Dương Vương</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">(028) 1234 5678</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">qnu@university-qnu.edu.vn</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-border mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-muted-foreground">
                            © 2024 Trường Đại học Quy Nhơn. Tất cả quyền được bảo lưu.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Chính sách bảo mật
                            </a>
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Điều khoản sử dụng
                            </a>
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Quy chế đào tạo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
