<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Report;
use App\Http\Resources\ReportResource;
use Illuminate\Support\Facades\Mail;
use App\Models\Offer;

class ReportController extends Controller
{
    function create(Request $request){
        $request->validate([
            "user_id"=>["required", "exists:users,id"],
            "offer_id"=>["required", "exists:offers,id"],
            "reason"=>"required",
        ]);

        $offer = Offer::find($request->offer_id);
        if($offer->user_id == $request->user_id){
            return response()->json([
                "message"=>"You cannot report your own offer",
            ], 400);
        }

        $report = new Report();
        $report->user_id = $request->user_id;
        $report->offer_id = $request->offer_id;
        $report->reason = $request->reason;
        $report->save();

        return response()->json([
            "report"=>ReportResource::make($report),
        ]);
    }

    function update(Request $request, $id){
        $report = Report::find($id);
        if(!$report){
            return response()->json([
                "message"=>"Report not found",
            ], 404);
        }

        $request->validate([
            "reason"=>"required",
        ]);

        $report->reason = $request->reason;
        $report->save();

        return response()->json([
            "report"=>ReportResource::make($report),
        ]);
    }

    function getReport($id){
        $report = Report::find($id);
        return response()->json([
            "report"=>ReportResource::make($report),
        ]);
    }

    function getReportsByUser($id){
        $reports = Report::where('user_id', $id)->get();
        return response()->json([
            "reports"=>ReportResource::collection($reports),
        ]);
    }

    function getReports(){
        $reports = Report::all();
        return response()->json([
            "reports"=>ReportResource::collection($reports),
        ]);
    }

    function delete(Request $request, $id){
        $report = Report::find($id);
        $report->delete();
        return response()->json([
            "message"=>"Report deleted successfully",
        ]);
    }
}
